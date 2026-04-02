import React, {type ReactNode} from 'react';
import styles from './ItemList.module.css';

interface ItemListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
    className?: string;
    itemClassName?: string;
}

export function ItemList<T>({
    items,
    renderItem,
    keyExtractor,
    emptyMessage = 'Нет данных',
    itemClassName = '',
}: ItemListProps<T>): React.ReactElement  {
    if (items.length === 0) return <div className={styles.empty}>{emptyMessage}</div>

    return (
       <>
        {items.map((item, index) => (
            <div key={keyExtractor(item)} className={`${styles.item} ${itemClassName}`}>
                {renderItem(item, index)}
            </div>
        ))}
       </>
    )
}