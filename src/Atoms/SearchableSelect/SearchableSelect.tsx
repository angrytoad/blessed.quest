import React, {FunctionComponent, ReactElement, useState} from "react";
import css from "./SearchableSelect.module.scss"
import TextInput from "../TextInput/TextInput";
import Fuse from "fuse.js";
import FuseResult = Fuse.FuseResult;

export type SearchableSelectOption = {
  render: ReactElement,
  [key: string]: any;
}

export type SearchableSelectPropsType = {
  className?: string,
  options: SearchableSelectOption[],
  keys: string[],
  onSelect: (option: SearchableSelectOption) => void
}

const SearchableSelect: FunctionComponent<SearchableSelectPropsType> = ({
  className,
  options,
  keys,
  onSelect,
}: SearchableSelectPropsType) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<FuseResult<SearchableSelectOption>[]>([]);

  const handleChangeSearch = (value: string) => {
    const fuse = new Fuse(options, {
      keys: keys,
    })

    const results = fuse.search<SearchableSelectOption>(value);
    setSearch(value);
    setSearchResults(results);
  }

  const handleSelect = (option: FuseResult<SearchableSelectOption>) => {
    onSelect(option.item);
    setSearchResults([]);
    setSearch("");
  }

  return (
    <div
      className={`
        ${css.searchableSelect}
        ${className}
      `}
    >
      <TextInput
        value={search}
        onChange={handleChangeSearch}
        placeholder="Enter search..."
      />
      {
        search.length > 0 && searchResults.length > 0 && (
          <div className={css.searchResults}>
            {
              searchResults.map((searchResult) => {
                return (
                  <div
                    key={searchResult.refIndex}
                    className={css.searchResult}
                    onClick={() => handleSelect(searchResult)}
                  >
                    { searchResult.item.render }
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  );
}

export default SearchableSelect;
