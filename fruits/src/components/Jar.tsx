import React from "react";
import styles from "@/components/Jar.module.css";
import { FaMinus } from "react-icons/fa6";
import iconMap from '@/components/iconMap';
import Paginator from "@/components/Paginator.tsx";
import { JarItem } from "@/types.ts";

interface FlatListProps {
  items: JarItem[];
  removeFn: React.FC<number>;
  totalCalories: number;
}

const Jar: React.FC<JarItem[]> = ({ items, removeFn, totalCalories }) => {
  return (
    <table className={styles.jar}>
      <thead>
        <tr className={styles.jarHeader}>
          <th className={styles.jarTh}>Name</th>
          <th className={styles.jarTh}>Calories</th>
          <th className={styles.jarTh}>Count</th>
          <th className={styles.jarTh}>Remove</th>
        </tr>
      </thead>
      <tbody>
        {items.map((fruit) => {
          const IconComponent = iconMap.get(fruit.name.toLowerCase()) ?? iconMap.get("404");
          return (
            <tr className={styles.jarTr} key={fruit.id}>
              <td className={styles.jarItemName}>
                <IconComponent /><h3>{fruit.name}</h3>
              </td>
              <td className={styles.jarTd}>{fruit.calories}</td>
              <td className={styles.jarTd}>{fruit.count}</td>
              <td className={styles.jarTd}>
                <FaMinus className={styles.iconBtn} onClick={() => removeFn(fruit.id)}/>
              </td>
            </tr>
          )
        })}

        <tr className={styles.jarTr}>
          <td className={styles.jarSummary} colSpan={4}>
            <h3>Total Calories: {totalCalories}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Jar;
