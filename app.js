/** @jsx React.DOM */
/**
 * Scaffold Command Line Generator
 *
 * Copyright (c) 2015 routeflags.inc
 * This file is licensed under the MIT License
 * http://opensource.org/licenses/MIT
 */
var Rows = React.createClass({
    createItem: function (column, lineNumber) {
        var columnPair = column.split(',');
        console.log(columnPair[1]);
        return <li>
            <label>
            カラム名
                <small> - Column Name </small>
            :&nbsp;
                <input type="text" value={columnPair[0]} onChange={this.props.handleInputChange.bind(null, lineNumber + ',column')} />
            </label>&nbsp;/&nbsp;
            <label>
            カラムタイプ
                <small> - Column Type </small>
            :&nbsp;
                <select value={columnPair[1]} onChange={this.props.handleInputChange.bind(null, lineNumber + ',columnType')}>
                {
                    (this.props.columnTypeOptions || []).map(function (value) {
                        return (
                            <option value={value}>{value}</option>
                        );
                    })
                }
            </select>
        </label>&nbsp;
            <a href="#" onClick={this.props.handleDelete.bind(this, column)}>
                <button className="btn btn-default btn-sm">delete</button>
            </a>
        </li>;
    },

    render: function () {
        return <ul>{this.props.rows.map(this.createItem)}</ul>;
    }
});

var Generator = React.createClass({
    getInitialState: function () {
        return {rows: ["NAME,string"]
            , text: ''
            ,table: "M_TABLE"
            ,column: "NAME"
            ,columnType: "string"
        };
    },
    getDefaultProps: function () {
        return {
            columnTypeOptions: ["string"
                , "text"
                , "integer"
                , "float"
                , "decimal"
                , "datetime"
                , "timestamp"
                , "time"
                , "date"
                , "binary"
                , "boolean"
                , "references"
                , "primary_key"]
        };
    },
    //todo
    handleDelete: function (itemToDelete, e) {
        console.dir(this.state.rows);

        var newItems = _.reject(this.state.rows, function (item) {
            return item == itemToDelete
        });
        console.dir(newItems);

        this.setState({rows: newItems});
    },

    //todo convert text to ?
    handleSubmit: function (e) {
        e.preventDefault();
        var nextItems = this.state.rows.concat([this.state.column+","+this.state.columnType]);
        this.setState({rows: nextItems});
    },

    /**
     * Rendering input forms and add button
     *
     * @this {Generator}
     * @return void
     * @param event {object} input filed
     * @param label {string}
     */
    handleInputChange: function (label, event) {
        var lineLabel = label.split(',');
        var row = this.state.rows[lineLabel[0]].split(',');
        if(lineLabel[1] == "column"){
            row[0] = event.target.value;
        }else{
            row[1] = event.target.value;
        }
        this.state.rows[lineLabel[0]] = row[0] + "," + row[1];
        this.setState({rows: this.state.rows});
    },

    /**
     * Rendering input forms and add button
     *
     * @this {Generator}
     * @return {string}
     */
    render: function () {
        var table = this.state.table;
        var rows = this.state.rows;
        return (
            <div>
                <pre>rails generate scaffold {table}&nbsp;
                {this.handleInputChange.bind(null, 'rows')}
                    {
                        (rows || []).map(function (values) {
                            var pair = values.split(',');
                            return (
                                pair[0] + ":" + pair[1] + " "
                        );
                    })
                }
                </pre>
                <p>
                    <label>
                    テーブル名
                        <small> - Table Name </small>
                    :&nbsp;
                        <input type="text" value={table} onChange={this.handleInputChange.bind(null, 'table')} />
                    </label>
                </p>
              <Rows rows={this.state.rows}
              handleDelete={this.handleDelete}
              columnTypeOptions={this.props.columnTypeOptions}
              handleInputChange={this.handleInputChange}/>
                <div className="row">
                    <div className="col-md-9"></div>
                <form onSubmit={this.handleSubmit}>
                    <button className="btn btn-primary btn-lg">{'Add #' + (this.state.rows.length + 1)}</button>
                </form>
                </div>
            </div>
            );
    }
});
React.render(<Generator />, document.getElementById('container'));