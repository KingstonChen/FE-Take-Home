"use client";
import { useState, useEffect, useMemo } from "react";
import Image from 'next/image';
import { Fruit, FruitGroup, JarItem } from "@/types.ts";
import styles from "./page.module.css";
import Paginator from "@/components/Paginator.tsx";
import FlatList from "@/components/FlatList.tsx";
import CollapsibleList from "@/components/CollapsibleList.tsx";
import Jar from "@/components/Jar.tsx";

const Home = () => {
  const groupKeys = ["family", "order", "genus"];
  const [loading, setLoading] = useState<boolean>(true);
  const [fruits, setFruits] = useState<object[]>([]);
  const [groupBy, setGroupBy] = useState<string>("None");
  const [jarMap, setJarMap] = useState<Map<number, number>>(new Map());

  // Fetch all fruits once
  useEffect(() => {
    async function getFruits() {
      setLoading(true);
      try {
        const response = await fetch("/api/fruits");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        setFruits(
          data.map((fruit) => ({
            id: fruit.id,
            name: fruit.name,
            order: fruit.order,
            family: fruit.family,
            genus: fruit.genus,
            calories: fruit.nutritions.calories
          })).sort(
            (a, b) => (a.name> b.name) ? 1 : ((b.name> a.name) ? -1 : 0)
          )
        );
      } catch (error) {
        console.error('Failed to fetch fruits:', error);
      } finally {
        setLoading(false);
      }
    }

    getFruits();
  }, [])

  // Mapping fruit id to fruit object
  const fruitMap: Map<number, Fruit> = useMemo(() => {
    const map = new Map<number, Fruit>();
    for (let fruit of fruits) {
      map.set(fruit.id, fruit);
    }
    return map;
  }, [fruits]);

  // Mapping groupKey to a list of FruitGroup objects
  const fruitGroups: Map<string, FruitGroup[]> = useMemo(() => {
    const dict = new Map<string, FruitGroup[]>();

    for (let groupKey of groupKeys) {
      const map = new Map<string, Fruit[]>();
      for (let fruit of fruits) {
        const key = fruit[groupKey].trim();
        if (!map.has(key)) map.set(key, []);
        map.get(key)?.push(fruit);
      }
      dict.set(groupKey, [...map].map((x) => ({
        name: x[0],
        fruits: x[1]
      })).sort(
        (a, b) => (a.name> b.name) ? 1 : ((b.name> a.name) ? -1 : 0)
      ));
    }

    return dict;
  }, [fruits]);

  const jarItems: JarItem[] = useMemo(() => {
    return [...jarMap].map(([id, count]) => ({
      id: id,
      name: fruitMap.get(id)?.name,
      calories: fruitMap.get(id)?.calories,
      count: count
    }))
  }, [jarMap]);

  // Add to the jar
  const addFn = (id: number) => {
    setJarMap(new Map(jarMap).set(id, (jarMap.get(id) ?? 0) + 1));
  }

  // Remove from the jar
  const removeFn = (id: number) => {
    const newMap = new Map(jarMap);
    if ((newMap.get(id) ?? 0) <= 1) newMap.delete(id)
    else newMap.set(id, newMap.get(id) - 1);
    setJarMap(newMap);
  }

  return (
    <main className={styles.main}>
      <section className={`${styles.section} ${styles.sectionLeft}`}>
        <div className={styles.sectionContent}>
          <div className={styles.contentHeader}>
            <h1 className={styles.title}>Fruits</h1>
            {!loading && (
              <div className={styles.groupBy}>
                <h2 className={styles.groupByTag}>Group By:</h2>
                <select className={styles.groupBySelect} onChange={e => setGroupBy(e.target.value)} value={groupBy}>
                  <option value="None">None</option>
                  <option value="family">Family</option>
                  <option value="order">Order</option>
                  <option value="genus">Genus</option>
                </select>
              </div>
            )}
          </div>
          {loading ? (
            <div className={styles.loadingContainer}>
              <Image src="/Loading.png" width={100} height={100} className={styles.loadingImg} alt="loading" />
              <h3>Loading...</h3>
            </div>
          ) : (
            <Paginator
              items={groupBy == "None" ? fruits : fruitGroups.get(groupBy)}
                maxRows={13}
                pageComponent={groupBy == "None" ? FlatList : CollapsibleList}
                addFn={addFn} /> 
          )}
        </div>
      </section>
      <section className={`${styles.section} ${styles.sectionRight}`}>
        <div className={`${styles.sectionContent} ${jarMap.size == 0 ? styles.emptyJar : ""}`}>
          <h1 className={styles.title}>Jar</h1>
          {jarMap.size > 0 && (
            <Paginator
              items={jarItems}
              maxRows={11}
              pageComponent={Jar}
              removeFn={removeFn}
              totalCalories={
                jarItems.reduce((cal, f) => cal + f.calories * f.count, 0)
              }/>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
