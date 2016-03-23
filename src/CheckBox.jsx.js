/**
 * @file 复选框组件
 * @author Brian Li
 * @email lbxxlht@163.com
 * @version 0.0.1
 */
define(function (require) {


    var React = require('react');
    var InputWidgetBase = require('./mixins/InputWidgetBase');
    var InputWidgetInForm = require('./mixins/InputWidgetInForm');


    return React.createClass({
        // @override
        mixins: [InputWidgetBase, InputWidgetInForm],
        // @override
        getDefaultProps: function () {
            return {
                ___uitype___: 'checkbox',
                className: '',
                style: {},
                label: '',
                value: '',
                labelPosition: 'left',
                disable: false,
                valueTemplate: false
            };
        },
        // @override
        getInitialState: function () {
            return {};
        },
        clickHandler: function (e) {
            if (this.props.disable) return;
            e.target = this.refs.inputbox;
            e.target.checked = !e.target.checked;
            this.___dispatchChange___(e);
        },
        changeHandler: function (e) {
            if (this.props.disable) return;
            this.___dispatchChange___(e);
        },
        render: function () {
            var containerProp = {
                className: 'fcui2-checkbox ' + this.props.className,
                style: {}
            };
            var labelProp = {
                className: 'fcui2-checkbox-label' + (this.props.labelPosition === 'right' ? ' right-label' : ''),
                onClick: this.clickHandler
            };
            var inputProp = {
                type: 'checkbox',
                value: this.props.value,
                checked: this.___getValue___(),
                onChange: this.changeHandler
            };
            this.___mergeInputHandlers___(inputProp, this.props);
            for (var key in this.props.style) {
                if (!this.props.style.hasOwnProperty(key)) continue;
                containerProp.style[key] = this.props.style[key];
            }
            if (this.props.disable) {
                containerProp.className += ' fcui2-checkbox-disable';
            }
            else if (this.state.isValid === false) {
                containerProp.className += ' fcui2-checkbox-reject';
            }
            return (
                <div {...containerProp}>
                    <span {...labelProp}>{this.props.label}</span>
                    <input {...inputProp} disabled={this.props.disable} ref="inputbox"/>
                </div>
            );
        }
    });
});