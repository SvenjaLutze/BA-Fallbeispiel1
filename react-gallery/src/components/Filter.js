import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
            this.state = {
            searchString: '',
        };
    }

    _handleSearchChange = (event) => {
        this.setState({ searchString: event.target.value }, () => {
          this.props.onFilterChange(this.state.searchString);
        });
      }

    render() {
        const { searchString } = this.state;
    
        return (
          <div>
            <div className="gallery-filter">
                <input
                    type="text"
                    placeholder="Bildersuche"
                    id="search-box"
                    value={searchString}
                    onChange={this._handleSearchChange}
                />
            </div>
          </div>
        );
    }
}

export default Filter;