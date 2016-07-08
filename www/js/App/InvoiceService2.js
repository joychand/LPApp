/**
 * Created by DELL on 25-03-2016.
 */
(function () {
    angular.module('LPApp').factory('PattaRptService', ['$q','$http','PqDataFactory', PattaRptService]);

    function PattaRptService($q,$http,PqDataFactory) {
        function createPdf(rptData) {
            return $q(function (resolve, reject) {


              /*  window.pdfMake.fonts = {

                    Roboto: {
                        normal: 'Roboto-Regular.ttf',
                        bold: 'Roboto-Medium.tff',
                        italics: 'Roboto-Italic.ttf',
                        bolditalics: 'Roboto-Medium.ttf'
                    },
                    Solaimanlipi: {
                        normal: 'SolaimanLipi.ttf',
                        bold: 'SolaimanLipi.tff',
                        italics: 'SolaimanLipi.ttf',
                        bolditalics: 'SolaimanLipi.ttf'
                    },
                    Lohit: {
                        normal: 'Lohit-Bengali.ttf',
                        bold: 'Lohit-Bengali.tff',
                        italics: 'Lohit-Bengali.ttf',
                        bolditalics: 'Lohit-Bengali.ttf'
                    },
                    vrinda: {
                        normal: 'vrinda.ttf',
                        bold: 'vrinda.tff',
                        italics: 'vrinda.ttf',
                        bolditalics: 'vrinda.ttf'
                    },
                    Rupali:{
                        normal: 'Rupali.ttf',
                        bold: 'Rupali.tff',
                        italics: 'Rupali.ttf',
                        bolditalics: 'Rupali.ttf'
                    },
                    SakalBharati:{
                        normal: 'SakalBharati_N_Ship.ttf',
                        bold: 'SakalBharati_N_Ship.ttf',
                        italics: 'SakalBharati_N_Ship.ttf',
                        bolditalics: 'SakalBharati_N_Ship.ttf'
                    }



                };
                var dd = createDocumentDefinition(rptData);
                var pdf = pdfMake.createPdf(dd);
                pdf.getBase64(function (output) {
                resolve(base64ToUint8Array(output));
               });
                */

                PqDataFactory.getJamabandi(rptData).then(function(data){
                    var pdf =data;
                     resolve(pdf)  ;
                      /* resolve
                        resolve(base64ToUint8Array(pdf));*/

                })


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

                   font: 'vrinda'

            }
        }

        return dd;
    }

    function base64ToUint8Array(base64) {
        var raw=decodeURIComponent(escape(window.atob(base64)));
       // var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
   /* function getJamabandi(){
        return $http.get('http://localhost:8090/mdf/examples/apitest.php')
            .then(function(response){
                var pdf=response.data;

            },function(error){
                console.log('error downloading' + error.message);
            })
    }
*/
})();

(function(){
    html2canvas(document.getElementById('exportthis'),
        {             onrendered: function (canvas)
           {                 var data = canvas.toDataURL();
               var docDefinition = {
                   content: [{
                       image: data, width: 500,  }]
               };
                     pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
           }
        });

})();