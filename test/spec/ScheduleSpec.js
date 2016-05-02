/**
 * @file spec for scheduleTools
 * @author Han Bing Feng
 */

define(function (require) {
    var _ = require('underscore');
    var scheduleTools = require('core/scheduleTools');

    function getParsedLength168Array() {
        var arr = [];
        for (var i = 0; i < 168; i++) {
            arr.push('');
        }
        return JSON.stringify(arr);
    }

    function getLength24Array() {
        var arr = [];
        for (var i = 0; i < 24; i++) {
            arr.push(null);
        }
        return arr;
    }

    describe('schedule', function () {
        describe('scheduleTools', function () {
            it('parses 168-length array to 7x24 length array', function () {
                var arr = getParsedLength168Array();
                var res = scheduleTools.parseValue(arr);
                expect(res.length).toBe(7);
                res.forEach(function (item) {
                    expect(item.length).toBe(24);
                    item.forEach(function (innerItem) {
                        expect(innerItem).toBe('');
                    });
                });
            });

            it('returns nothing for unexpected input', function () {
                expect(scheduleTools.parseValue('!')).toEqual([]);
            });

            it('puts correct value in correct pos', function () {
                var arr = getParsedLength168Array();
                // 7th position every day put '1.0'
                arr = JSON.parse(arr);
                _.each(_.range(7, 168, 24), function (v) {
                    arr[v] = '1.0';
                });

                arr = JSON.stringify(arr);
                var res = scheduleTools.parseValue(arr);
                res.forEach(function (item) {
                    expect(item[7]).toBe('1.0');
                });
            });

            it('returns nothing for label from nothing', function () {
                expect(scheduleTools.value2label(getLength24Array())).toEqual([]);
            });

            it('returns label for hour0', function () {
                var arr = getLength24Array();
                arr[0] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 0,
                    end: 0,
                    value: '1.0'
                });
            });

            it('returns label for hour2', function () {
                var arr = getLength24Array();
                arr[2] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 2,
                    end: 2,
                    value: '1.0'
                });
            });

            it('returns label for hour0, 1, 2', function () {
                var arr = getLength24Array();
                arr[0] = '1.0';
                arr[1] = '1.0';
                arr[2] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 0,
                    end: 2,
                    value: '1.0'
                });
            });

            it('returns label for hour2, 3, 4', function () {
                var arr = getLength24Array();
                arr[2] = '1.0';
                arr[3] = '1.0';
                arr[4] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 2,
                    end: 4,
                    value: '1.0'
                });
            });

            it('returns label for hour0 and hour 2', function () {
                var arr = getLength24Array();
                arr[0] = '1.0';
                arr[2] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(2);
                expect(labels[0]).toEqual({
                    begin: 0,
                    end: 0,
                    value: '1.0'
                });
                expect(labels[1]).toEqual({
                    begin: 2,
                    end: 2,
                    value: '1.0'
                });
            });

            it('returns label for hour2 and hour 4', function () {
                var arr = getLength24Array();
                arr[2] = '1.0';
                arr[4] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(2);
                expect(labels[0]).toEqual({
                    begin: 2,
                    end: 2,
                    value: '1.0'
                });
                expect(labels[1]).toEqual({
                    begin: 4,
                    end: 4,
                    value: '1.0'
                });
            });

            it('returns label for hour0, 1 and hour 2, 3, for different values', function () {
                var arr = getLength24Array();
                arr[0] = '1.0';
                arr[1] = '1.0';
                arr[2] = '2.0';
                arr[3] = '2.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(2);
                expect(labels[0]).toEqual({
                    begin: 0,
                    end: 1,
                    value: '1.0'
                });
                expect(labels[1]).toEqual({
                    begin: 2,
                    end: 3,
                    value: '2.0'
                });
            });

            it('returns label for hour23', function () {
                var arr = getLength24Array();
                arr[23] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 23,
                    end: 23,
                    value: '1.0'
                });
            });

            it('returns label for hour22, 23', function () {
                var arr = getLength24Array();
                arr[22] = '1.0';
                arr[23] = '1.0';
                var labels = scheduleTools.value2label(arr);
                expect(labels.length).toBe(1);
                expect(labels[0]).toEqual({
                    begin: 22,
                    end: 23,
                    value: '1.0'
                });
            });

        });
    });
});