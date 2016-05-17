/**
 * Created by DELL on 25-03-2016.
 */
(function () {
    angular.module('LPApp').factory('PattaRptService', ['$q', PattaRptService]);

    function PattaRptService($q) {
        function createPdf(rptData) {
            return $q(function (resolve, reject) {


                window.pdfMake.fonts = {

                    Roboto: {
                        normal: 'Roboto-Regular.ttf',
                        bold: 'Roboto-Medium.tff',
                        italics: 'Roboto-Italic.ttf',
                        bolditalics: 'Roboto-Medium.ttf'
                    },
                    Solaimanlipi: {
                        normal: 'SolaimanLipi-Normal.ttf',
                        bold: 'SolaimanLipi-Bold.tff',
                        italics: 'SolaimanLipi-Normal.ttf',
                        bolditalics: 'SolaimanLipi-Bold.ttf'
                    }

                };
                var dd = createDocumentDefinition(rptData);
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
        //var plot=Object.keys(rptData.plot).map(function(item) { return [item.newDagNo, item.oldDagNo, item.newPattaNo,item.area,item.area_acre,item.landClass] });
        console.log(rptData.plot);
        /*var plot = rptData.plot.map(function (item) {
            return [item.newDagNo, item.oldDagNo, item.newPattaNo,item.area,item.area_acre,item.landClass];
        });*/
        var pattadar = rptData.pattadar.map(function (item) {
            return [item.ownno.toString(), item.name, item.father,item.address];
        });

        var dd = {
            pageSize:'A4',

            content: [
                { text: 'PattaDetails',style:'header' },


                {

                    table: {
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [

                                'District:',
                                rptData.location.district,
                                'Circle:',
                                rptData.location.circle,
                                'Village:',
                                rptData.location.village

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
                        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: [
                            [
                                { text: 'NewDagno', style: 'itemsTableHeader' },
                                { text: 'OldPattaNo', style: 'itemsTableHeader' },
                                { text: 'NewPattaNo', style: 'itemsTableHeader' },
                                { text: 'Area(A)', style: 'itemsTableHeader' },
                                { text: 'Area(H)', style: 'itemsTableHeader' },
                                { text: 'LandClass', style: 'itemsTableHeader' }

                            ],
                            [
                               /* {text:rptData.plot.newDagNo},
                                {text:rptData.plot.newDagNo},
                                {text:rptData.plot.newDagNo},
                                {text:rptData.plot.newDagNo},
                                {text:rptData.plot.newDagNo},
                                {text:rptData.plot.newDagNo}*/
                                rptData.plot.newDagNo,
                                rptData.plot.oldDagNo,
                                rptData.plot.newPattaNo,
                                /*rptData.plot.newPattaNo,
                                rptData.plot.newPattaNo,*/
                                rptData.plot.area_acre.toString(),
                                rptData.plot.area.toString(),
                                rptData.plot.landClass



                            ]
                       ]//.concat(plot)
                        //]
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
                                { text: 'Father/Husband', style: 'itemsTableHeader' },
                                { text: 'Address', style: 'itemsTableHeader' }
                            ]
                        ].concat(pattadar)
                       // ]
                    }
                }

            ],
            styles: {
                header: {
                    fontSize: 30,
                   // bold: true,
                    margin: [0, 0, 0, 10],
                    alignment: 'centre'
                },
                subheader: {
                    fontSize: 16,
                   // bold: true,
                    margin: [0, 20, 0, 5]
                },
                itemsTable: {
                    margin: [0, 5, 0, 15]
                },
                itemsTableHeader: {
                   // bold: true,
                    fontSize: 13,
                    //color: 'black'
                },
                totalsTable: {
                    //bold: true,
                    margin: [0, 30, 0, 0]
                }
            },
            defaultStyle: {

                   font: 'Solaimanlipi'

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