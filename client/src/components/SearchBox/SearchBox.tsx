import React from 'react'
import { ISearchBoxProps } from '@Utils/interface/ComponentInterface/SearchBoxInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'

import { SearchIcon } from '@Assets/images'

const SearchBox: React.FC<IDefaultPageProps & ISearchBoxProps> = props => {
  return (
    <div className="search-box">
      <div className="input-group bg-color2 ml-n5 rounded">
        <span className="d-flex" id="basic-addon1">
          <input
            type="search"
            className="search-input nrounded-pill form-field form-control fs-14"
            aria-label="Search"
            placeholder={props.t('search.search')}
            aria-describedby="basic-addon1"
            onChange={props.handleChange}
            {...props}
          />
          <figure className="pointer">
            <div className="search-panel">
              <img src={SearchIcon} className="search-icon" />
            </div>
          </figure>
        </span>
      </div>
    </div>
  )
}
export default SearchBox
