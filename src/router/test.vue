<template>
    
<div class="col-lg-12 control-section">
    <!-- <button @contextmenu.prevent="handler">r-click</button>
    <div>
        <ejs-treegrid :dataSource='data' childMapping='states' :height='400' :allowReordering='true' :allowFiltering='true'
        :allowSorting='true' :filterSettings='filterSettings' :queryCellInfo='queryCellInfo' :actionFailure='actionFailure'>
            <e-columns>
                <e-column field='name' headerText='Province' width='170' :template="flagtemplate"></e-column>
                <e-column field='population' headerText='Population (Million)' width='188' textAlign='Right'></e-column>
                <e-column field='gdp' headerText='GDP Rate %' :template='gdpTemplate' width='150'></e-column>
                <e-column field='rating' headerText='Credit Rating' width='150' :template='ratingTemplate' :allowFiltering='false'></e-column>
                <e-column field='unemployment' headerText='Unemployment Rate' :allowFiltering='false' width='170' :template='unemploymentTemplate'></e-column>
                <e-column field='coordinates' headerText='Coordinates' width='220' :allowSorting='false' :template='locationTemplate'></e-column>
                <e-column field='area' headerText='Area' width='140' :template='areaTemplate'></e-column>
                <e-column field='timezone' headerText='Time Zone' width='150' :template='timezoneTemplate'></e-column>
            </e-columns>
        </ejs-treegrid>
    </div> -->


</div>
</template>
<script>
// import Vue from "vue";
// import { TreeGridPlugin, Filter, TreeGridComponent, Sort, Reorder, ITreeData } from "@syncfusion/ej2-vue-treegrid";
// Vue.use(TreeGridPlugin);
// Vue.use(GridPlugin);

// export default {
//     name:'test',
//     components:{
//         GridPlugin, DetailRow, Sort
//     },

//   data : function() {
//     return {
//       parentData: [{
//           key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//       },
//       {
//           key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//       },
//       {
//           key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//       },
//       ],
//       childGrid: {
//         dataSource: [{
//             key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//         },
//         {
//           key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//       },
//       {
//           key1:"asdasdas",
//             key2:"asdasd",
//             key3:"asdasd"
//       },],
//         queryString: "key1",
//           columns: [
//           {
//             field: "key1",
//             headerText: "",
//             textAlign: "Right",
//             width: 120,
//           },
//           { field: "key2", headerText: "", width: 140},
//           { field: "key3", headerText: "", width: 170},
//           ]
//       }
//     };
//   },
//   methods : {
//       handler () {

//       }
//   },
//   provide: {
//     grid: [DetailRow, Sort]
//   }
// };
</script>
<style>
/* .grid .e-detailcell {
    border-color: white;
}
.e-grid .e-detailcell {
    border-top-style: none;
    border-top-width: 0px;
    border-bottom-width: 0px;
    padding: 0;
}
.e-grid {
    border-color:white
}
.e-grid .e-gridheader {
    background-color: #fff;
    border-bottom-color: black;
    border-top-color: white;
}
grid .e-detailcell {
    border-color: white;
}
.e-grid .e-rowcell, .e-grid .e-groupcaption, .e-grid .e-indentcell, .e-grid .e-recordplusexpand, .e-grid .e-recordpluscollapse, .e-grid .e-detailrowcollapse, .e-grid .e-detailrowexpand, .e-grid .e-detailindentcell, .e-grid .e-detailcell {
    border-color: white;
} */
</style>
