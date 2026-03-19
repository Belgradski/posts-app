import { type FilterType, getFilterLabel } from "../lib/filterBylength";
import Button from "../../../shared/ui/Button/Button";
import {memo, useCallback } from "react";
import styles from "./PostLengthFilter.module.css"

interface PostLengthFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filterOption: FilterType[] = ["all", "short", "medium", "long"];

const PostLengthFilter: React.FC<PostLengthFilterProps> = memo(({
  currentFilter,
  onFilterChange,
}) => {
    const handleClick = useCallback((filter: FilterType)=> {
        onFilterChange(filter);
    }, [onFilterChange]);

    return (
        <div className={styles.container}>
           {filterOption.map((filter) => (
            <Button key={filter}
            variant={currentFilter === filter ? 'primary' : 'secondary'}
            onClick={() => {handleClick(filter)}}
            >{getFilterLabel(filter)}</Button>
           ))}
        </div>
    )
});

export default PostLengthFilter;