import React, { useMemo, useState } from "react";
import { Fruit, FruitGroup } from "@/types.ts";
import { FaChevronDown } from "react-icons/fa6";

import FlatList from "@/components/FlatList.tsx";
import styles from "@/components/CollapsibleList.module.css";


interface CollapsibleProps {
  fruits: Fruit[];
  header: string;
  addFn: React.FC<number>;
}

interface CollapsibleListProps {
  items: FruitGroup[];
  addFn: React.FC<number>;
}

const Collapsible: React.FC<CollapsibleProps> = ({ fruits, header, addFn }) => {
  const [open, setOpen] = useState<boolean>(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <li className={styles.listItem}>
      <span className={styles.header} onClick={() => setOpen(!open)}>
        <h2>{header}</h2>
        <FaChevronDown className={`${styles.openIcon} ${open && styles.open}`} />
      </span>
      <div
        ref={contentRef}
        className={styles.collapsibleTable}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight}px` : '0',
        }}>
        <FlatList items={fruits} addFn={addFn} />
      </div>
    </li>
  )
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({ items, addFn }) => {
  return (
    <ul className={styles.collapsibleList}>
      {items.map((group) => (
        <Collapsible fruits={group.fruits} header={group.name} addFn={addFn} key={group.name} />
      ))}
    </ul>
  );
};

export default CollapsibleList;
