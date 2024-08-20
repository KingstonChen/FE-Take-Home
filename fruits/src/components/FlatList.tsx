import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import styles from "@/components/FlatList.module.css";
import iconMap from '@/components/iconMap';
import { Fruit } from "@/types.ts";

interface FlatListProps {
  items: Fruit[];
  addFn: React.FC<number>;
}

const FlatList: React.FC<FlatListProps> = ({ items, addFn }) => {
  return (
    <ul className={styles.flatList}>
      {items.map((fruit) => {
        const IconComponent = iconMap.get(fruit.name.toLowerCase()) ?? iconMap.get("404");
        return (
          <li key={fruit.id} className={styles.listItem}>
            <div className={styles.listContent}>
              <div className={styles.itemName}>
                <IconComponent />
                <h3>{fruit.name} ({fruit.calories})</h3>
              </div>
              <button onClick = {() => addFn(fruit.id)} className={styles.addBtn}>
                <FaPlus />
              </button>
            </div>
          </li>
        )
      }
      )}
    </ul>
  );
};

export default FlatList;
