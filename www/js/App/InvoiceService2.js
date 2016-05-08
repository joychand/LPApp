/**
 * Created by DELL on 25-03-2016.
 */
(function () {
    angular.module('LPApp').factory('PattaRptService', ['$q', PattaRptService]);

    function PattaRptService($q) {
        function createPdf(rptData) {
            return $q(function (resolve, reject) {

                var dd = createDocumentDefinition(rptData);
               /* pdfMake.fonts = {

                    Roboto: {
                        normal: 'Roboto-Regular.ttf',
                        bold: 'Roboto-Medium.tff',
                        italics: 'Roboto-Regular.ttf',
                        bolditalics: 'Roboto-Medium.ttf'
                    },
                    SolaimanLipi: {
                        normal: 'SolaimanLipi.ttf',
                        bold: 'SolaimanLipi_Bold.tff',
                        italics: 'SolaimanLipi.ttf',
                        bolditalics: 'SolaimanLipi.ttf'
                    }

                };*/

                var pdf = pdfMake.createPdf(dd);

                pdf.getBase64(function (output) {
                    resolve(base64ToUint8Array(output));
                });
            });
        }

        return {
            createPdf: createPdf
        };
    }

    function createDocumentDefinition(rptData) {
        var plot=Object.keys(rptData.plot).map(function(item) { return [item.newDagNo, item.oldDagNo, item.newPattaNo,item.area,item.area_acre,item.landClass] });

        /*var plot = rptData.plot.map(function (item) {
            return [item.newDagNo, item.oldDagNo, item.newPattaNo,item.area,item.area_acre,item.landClass];
        });*/
        var pattadar = rptData.pattadar.map(function (item) {
            return [item.ownno, item.name, item.father,item.address];
        });

        var dd = {
            pageSize:'A4',
            content: [
                { text: 'PattaDetails', style: 'header' },
                /*{ text: rptData.Date, alignment: 'centre' },*/

                {
                    style: 'totalsTable',
                    table: {
                        widths: [75, 75, 75, 75, 75, 75],
                        body: [
                            [
                                'District:',
                                'পিং মৃত কুলা সিংহ',
                                'Circle:',
                                'পিং মৃত কুলা সিংহ',
                                'Village:',
                                'পিং মৃত কুলা সিংহ'

                               /* 'District:',
                                rptData.location.district,
                                'Circle:',
                                rptData.location.circle,
                                'Village:',
                                rptData.location.village*/

                            ]

                        ]
                    },
                    layout: 'noBorders'
                },

                { text: 'PlotDetails', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        headerRows:1,
                        widths: ['*',75,75,75,75,75],
                        body: [
                            [
                                { text: 'NewDagno', style: 'itemsTableHeader' },
                                { text: 'OldPattaNo', style: 'itemsTableHeader' },
                                { text: 'NewPattaNo)', style: 'itemsTableHeader' },
                                { text: 'Area(A)', style: 'itemsTableHeader' },
                                { text: 'Area(H)', style: 'itemsTableHeader' },
                                { text: 'LandClass', style: 'itemsTableHeader' }

                            ]
                       // ]//.concat(plot)
                        ]
                            }
                },
                { text: 'Pattadars', style: 'subheader' },
                {
                    style: 'itemsTable',
                    table: {
                        headerRows:1,
                        widths: ['auto','30%','30%','*'],
                        body: [
                            [
                                { text: 'Slno', style: 'itemsTableHeader' },
                                { text: 'Name', style: 'itemsTableHeader' },
                                { text: 'Father/Husband)', style: 'itemsTableHeader' },
                                { text: 'Address)', style: 'itemsTableHeader' }
                            ]
                       // ].concat(pattadar)
                        ]
                    }
                }

            ],
            styles: {
                header: {
                    fontSize: 30,
                    bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'centre'
                },
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 20, 0, 5]
                },
                itemsTable: {
                    margin: [0, 5, 0, 15]
                },
                itemsTableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                },
                totalsTable: {
                    bold: true,
                    margin: [0, 30, 0, 0]
                }
            },
            defaultStyle: {

                 /*  font: 'Roboto'*/

            }
        }

        return dd;
    }

    function base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
})();