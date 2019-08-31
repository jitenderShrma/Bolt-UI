<template>
 <div class="animated slideInLeft" style="animation-duration:100ms">

    <div id="target" class="col-lg-12 control-section">
        <div>
          <ejs-toolbar id="toolbarbudget" :clicked="clickHandler">
            <e-items><!-- 
              <e-item align="right" id="add" :text="$ml.get('add')" :template="addTemplate" ></e-item> -->
              <e-item align="right" id="upload" :template="uploadTemplate" :text="$ml.get('upload')"></e-item>
              <e-item align="right" id="delete" :text="$ml.get('delete')" :template="deleteTemplate"></e-item>
            </e-items>
          </ejs-toolbar>
          <b-col sm="1" id="xs" style="position: fixed; top: -6%; right: 6%;width:55px;z-index:1001">
            <b-dropdown size="sm" id="ddown_primary" :text="currentView" variant="primary" class="m-0">
              <b-dropdown-item @click="switchGraph"><span v-text="$ml.get('graph')"></span></b-dropdown-item>
              <b-dropdown-item @click="switchValue"><span v-text="$ml.get('budget')"></span></b-dropdown-item>
            </b-dropdown>
          </b-col>
          <div v-if="selected2=='Jan'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Feb'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Mar'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Apr'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='May'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Jun'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='July'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Aug'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>

                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>

                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Sep'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Oct'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Nov'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-if="selected2=='Dec'">
            <ejs-treegrid ref='treegrid' :rowHeight='rowHeight'  :dataSource='data' 
            :treeColumnIndex="1" childMapping="children" :height='height' :allowReordering='true' :allowFiltering='true'
            :allowPdfExport='true' 
            :allowExcelExport='true'
            :actionComplete="actionComplete"
            :enableCollapseAll="false" :toolbar="toolbar"
            :rowSelected="rowSelected" :toolbarClick="clickHandler"
            :recordDoubleClick="beginEdit"
            :rowDeselecting="rowDeselecting"
            :allowSorting='true' :editSettings='editSettings' :allowPaging= 'true' :pageSettings='pageSettings' :allowResizing= 'true' :filterSettings='filterSettings' :created="load">
                <e-columns>
                    <e-column :visible="false" field='_id'></e-column>
                    <e-column field='name' headerText='Head Name' ></e-column>
                    <e-column :visible="!something" field='permissible_values.11' :template="template12" headerText='Dec' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.0' :template="template1" headerText='Jan' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.1' :template="template2" headerText='Feb' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.2' :template="template3" headerText='Mar' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.3' :template="template4" headerText='Apr' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.4' :template="template5" headerText='May' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.5' :template="template6" headerText='Jun' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.6' :template="template7" headerText='Jul' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.7' :template="template8" headerText='Aug' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.8' :template="template9" headerText='Sep' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.9' :template="template10" headerText='Oct' width="110px"></e-column>
                    <e-column :visible="!something" field='permissible_values.10' :template="template11" headerText='Nov' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.11'  headerText='Dec' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.0'  headerText='Jan' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.1'  headerText='Feb' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.2'  headerText='Mar' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.3' headerText='Apr' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.4'  headerText='May' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.5'  headerText='Jun' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.6'  headerText='Jul' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.7'  headerText='Aug' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.8'  headerText='Sep' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.9'  headerText='Oct' width="110px"></e-column>
                    <e-column :visible="something" field='permissible_values.10'  headerText='Nov' width="110px"></e-column>
                    
                </e-columns>
            </ejs-treegrid>
        </div>
        <div v-else>
        </div>
            <b-modal :title="$ml.get('addhead')" class="modal-primary" v-model="modal" @ok="modal = false" hide-footer>
              <div>
                <b-form v-on:submit.prevent="addHead">
                  <b-form-group style="padding:5%">
                 <div class="e-float-input e-control-wrapper">
                  <input v-validate="'required'" v-model="input.name" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column1" id="_gridcontrolname" name="Head Name" style="text-align:undefined" aria-labelledby="label__gridcontrolname">
                  <span class="e-float-line"></span>
                  <span id="errors">{{ errors.first('Head Name') }}</span>
                  <label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Head Name</label>
                </div>
                  <div class="e-float-input e-control-wrapper">
                    <input v-validate="'required'" v-model="input.head_key" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column2" id="_gridcontrolhead_key" name="Head Key" style="text-align:undefined" aria-labelledby="label__gridcontrolhead_key">
                    <span class="e-float-line"></span>
                    <span id="errors">{{ errors.first('Head Key') }}</span>
                    <label class="e-float-text e-label-top" id="label__gridcontrolhead_key" for="_gridcontrolhead_key">Head Key</label>
                  </div>
                    <div class="e-float-input e-control-wrapper">
                      <input v-model="input.accounting_head" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column3" id="_gridcontrolaccounting_head" name="accounting_head" style="text-align:undefined" aria-labelledby="label__gridcontrolaccounting_head">
                      <span class="e-float-line"></span>
                      <label class="e-float-text e-label-top" id="label__gridcontrolaccounting_head" for="_gridcontrolaccounting_head">Account Head</label>
                    </div>
                    <div class="e-float-input e-control-wrapper">
                      <input v-model="input.notes" class="e-field e-defaultcell" type="text" value="" e-mappinguid="grid-column4" id="_gridcontrolnotes" name="notes" style="text-align:undefined" aria-labelledby="label__gridcontrolnotes">
                      <span class="e-float-line"></span>
                      <label class="e-float-text e-label-top" id="label__gridcontrolnotes" for="_gridcontrolnotes">Notes</label>
                    </div>
                    <br>
                    
                    <label v-text="$ml.get('department')"></label>
                      <treeselect :placeholder="$ml.get('pholddept')" v-model="input.department" :multiple="false" :options="department" />
                    <label v-text="$ml.get('parenthead')"></label>
                      <treeselect :placeholder="$ml.get('pholdparenthead')" v-model="input.parent_head" :multiple="false" :options="head" />
                </b-form-group>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button></b-form>
                </div>
            </b-modal>
            <b-modal :title="$ml.get('edithead')+` : `+`${editinput.name}`" class="modal-primary" v-model="editmodal" @ok="editmodal = false" hide-footer>

              <b-form v-on:submit.prevent="editHead">
                <b-tabs>
                  <b-tab :title="$ml.get('head')" active>
                <b-form-group>
                  <div class="e-float-input e-control-wrapper"><input v-model="editinput.name" class="e-field e-defaultcell" type="text" e-mappinguid="grid-column168" id="_gridcontrolname" name="name" style="text-align:undefined" aria-labelledby="label__gridcontrolname"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolname" for="_gridcontrolname">Head Name</label></div><div class="e-float-input e-control-wrapper"><input v-model="editinput.accounting_head" class="e-field e-defaultcell" type="text" e-mappinguid="grid-column170" id="_gridcontrolaccounting_head" name="accounting_head" style="text-align:undefined" aria-labelledby="label__gridcontrolaccounting_head"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolaccounting_head" for="_gridcontrolaccounting_head">Account Head</label></div><div class="e-float-input e-control-wrapper"><input v-model="editinput.notes" class="e-field e-defaultcell" type="text"  e-mappinguid="grid-column171" id="_gridcontrolnotes" name="notes" style="text-align:undefined" aria-labelledby="label__gridcontrolnotes"><span class="e-float-line"></span><label class="e-float-text e-label-top" id="label__gridcontrolnotes" for="_gridcontrolnotes">Notes</label></div>
                    <label v-text="$ml.get('department')"></label>
                      <treeselect :placeholder="$ml.get('pholddept')" v-model="editinput.department" :multiple="false" :options="department" />
                      <label v-text="$ml.get('parenthead')"></label>
                      <treeselect :defaultExpandLevel="10" noChildrenText="" :placeholder="$ml.get('pholdparenthead')" v-model="editinput.parent_head" :multiple="false" :options="head" />
                </b-form-group>
                </b-tab>
                <b-tab :title="$ml.get('labels')">
                  <b-form-group>
                    <div v-for="(run,i) in editinput.labels" :key="i">
                      <b-badge style="font-weight:lighter;margin:5px;font-size:15px;" :variant="editinput.labels[i].color">{{editinput.labels[i].label_name}}</b-badge>
                      <b-btn style="float:right" v-on:click="delLabel(`${editinput.labels[i]._id}`,`${editinput._id}`,`${i}`)" size="sm" variant="darkred"><i class="fa fa-trash-o"></i></b-btn>
                    </div>
                    <b-form v-on:submit.prevent = "selectLabel(`${editinput._id}`)">
                      <label v-text="$ml.get('labels')"></label>
                      <cool-select menuItemsMaxHeight="100px" :items="labels" item-text="label_name" item-value="_id" v-model="selectedLabel">
                        <div slot="item" slot-scope = "{item :label}">
                          <b-badge style="font-weight:lighter;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="selection" slot-scope = "{item :label}">
                          <b-badge style="font-weight:lighter;" id="label" :variant="label.color">{{label.label_name}}</b-badge>
                        </div>
                        <div slot="after-items-fixed">
                          <b-btn block @click="addModal = true" variant="primary" v-text="$ml.get('label')"></b-btn>
                        </div>
                      </cool-select>
                      <br>
                        <div slot="footer">
                          <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('add')"><i class="fa fa-dot-circle-o"></i></b-button>
                        </div>
                    </b-form>
                  </b-form-group>
                </b-tab>
                </b-tabs>
                <b-button  type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
              </b-form>
            </b-modal>
            <b-modal size="sm" :title="$ml.get('label')" class="modal-primary" v-model="addModal" @ok="addModal = false" hide-footer>
              <b-form v-on:submit.prevent="addLabel(`${editinput._id}`)">
              <div class="content-wrapper textbox-default">
              <div class="row">
              <div class="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                      <ejs-textbox v-model="formdata.label_name" floatLabelType="Auto" placeholder="Label Name" required></ejs-textbox>
              </div>
              </div>
              <br>
              <div class="row">
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <p>Label Color</p>
                  </div>
                  <div class="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                          <ejs-colorpicker :modeSwitcher="false" value="#000" mode="Palette" :columns="squarePalettesColn" :presetColors="circlePaletteColors" :change="onChange" id="color-picker"></ejs-colorpicker>
                  </div>
              </div>
              <br>
              <div class="multiline_wrapper">
                  <ejs-textbox v-model="formdata.description" ref="textareaObj" id="default" :multiline="true" floatLabelType="Auto" placeholder="Description" required></ejs-textbox>
              </div>
              </div>
              <div slot="footer">
                    <b-button type="submit" size="sm" variant="primary" v-text="$ml.get('submit')"><i class="fa fa-dot-circle-o"></i></b-button>
                </div>
                </b-form>
            </b-modal>
            <b-modal :title="$ml.get('upload')" size="sm" class="modal-primary" v-model="browseModal" @ok="browseModal = false" hide-footer>
          <div id="modalTarget" class="control-section; position:relative" style="height:300px;">
              <ejs-uploader ref="uploadObj" id='defaultfileupload' :multiple = "false" :success="onUploadSuccess" :progress="onProgress" :failure="onUploadFailed"  :allowedExtensions="extensions" :asyncSettings="path" name="UploadFiles"></ejs-uploader>
            </div>
        </b-modal>
        </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import apiUrl from '@/apiUrl'
import { UploaderPlugin } from '@syncfusion/ej2-vue-inputs';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { ExcelExport,PdfExport,TreeGridPlugin, Edit, Filter,CommandColumn, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page } from "@syncfusion/ej2-vue-treegrid";
import { addClass, removeClass, getValue } from '@syncfusion/ej2-base';
import { ToolbarPlugin } from "@syncfusion/ej2-vue-navigations";
import { DialogPlugin } from '@syncfusion/ej2-vue-popups';
import { NumericTextBoxPlugin,ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import { TextBoxPlugin } from '@syncfusion/ej2-vue-inputs';
import {CoolSelect} from 'vue-cool-select'
  import { MultiSelectPlugin, DropDownListPlugin } from "@syncfusion/ej2-vue-dropdowns";
  Vue.use(DropDownListPlugin);
Vue.use(TextBoxPlugin);
Vue.use(TreeGridPlugin)
Vue.use(ToolbarPlugin)
Vue.use(DialogPlugin)
Vue.use(UploaderPlugin);
Vue.use(NumericTextBoxPlugin);
Vue.use(ColorPickerPlugin);
var api = axios.create({
  withCredentials :true
})
import { ChartPlugin,DataLabel, StackingBarSeries, Legend, Category, Tooltip, Theme} from "@syncfusion/ej2-vue-charts";
Vue.use(ChartPlugin);

let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

var template1Vue = Vue.component('template1',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[0]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[0]/this.data.permissible_values[0])*100+ "e+2")  + "e-2")
            }       
              })
var template2Vue = Vue.component('template2',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[1]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[1]/this.data.permissible_values[1])*100+ "e+2")  + "e-2")
            }       
              })
var template3Vue = Vue.component('template3',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[2]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[2]/this.data.permissible_values[2])*100+ "e+2")  + "e-2")
            }       
              })
var template4Vue = Vue.component('template4',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[3]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[3]/this.data.permissible_values[3])*100+ "e+2")  + "e-2")
            }       
              })
var template5Vue = Vue.component('template5',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[4]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[4]/this.data.permissible_values[4])*100+ "e+2")  + "e-2")
            }       
              })
var template6Vue = Vue.component('template6',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[5]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[5]/this.data.permissible_values[5])*100+ "e+2")  + "e-2")
            }       
              })
var template7Vue = Vue.component('template7',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[6]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[6]/this.data.permissible_values[6])*100+ "e+2")  + "e-2")
            }         
              })
var template8Vue = Vue.component('template8',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[7]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[7]/this.data.permissible_values[7])*100+ "e+2")  + "e-2")
            }       
              })
var template9Vue = Vue.component('template9',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[8]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[8]/this.data.permissible_values[8])*100+ "e+2")  + "e-2")
            }       
              })
var template10Vue = Vue.component('template10',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[9]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[9]/this.data.permissible_values[9])*100+ "e+2")  + "e-2")
            }       
              })
var template11Vue = Vue.component('template11',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[10]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[10]/this.data.permissible_values[10])*100+ "e+2")  + "e-2")
            }       
              })
var template12Vue = Vue.component('template12',{
                template:`<div><span style="font-size:10px;">{{data.amount_left[11]}}</span>
                <div v-if="value>=70"><b-progress height="3px" :value="value" variant="success" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=50 && value<=68"><b-progress height="3px" :value="value" variant="primary" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value>=30 && value<=49"><b-progress height="3px" :value="value" variant="warning" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value<30 && value>0"><b-progress height="3px" :value="value" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <div v-if="value==0"><b-progress height="3px" :value="100" variant="darkred" striped :animated="true" class="mb-2"></b-progress></div>
                <span style="font-size:10px;float:right">{{value}}%</span>
                </div>`,
                data: function() {
                  return {
                    data:{},
                    value:0,
              };
            },
            mounted() {
              this.value = +(Math.round((this.data.amount_left[11]/this.data.permissible_values[11])*100+ "e+2")  + "e-2")
            }       
              })

export default {
    name: "HeadList",
    components :  {
      Treeselect,
      CoolSelect,
        TreeGridPlugin,ChartPlugin,ToolbarPlugin,ExcelExport,PdfExport, Edit,CommandColumn, Filter, Toolbar, TreeGridComponent, Sort, Reorder,Resize, Page
    },
    data : function() {
        return {
          uploadTemplate: function () {
              return {
                  template: Vue.component("uploadTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-upload"></i>&nbsp<span id="hide" v-text="$ml.get('upload')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                browseModal:false,
            allowCalculatedField:true,
                complete:false,
                upload:false,
                extensions : '.csv',
                path: {
                  saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
                  removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
                },
                dropElement: '.control-fluid',
                change: (args) => {
                  this.$refs.uploadObj.autoUpload = args.checked;
                  this.$refs.uploadObj.clearAll();
              },
              changed: (args) => {
                  this.$refs.uploadObj.sequentialUpload = args.checked;
                  this.$refs.uploadObj.clearAll();
              },
          
        addTemplate: function () {
              return {
                  template: Vue.component("addTemplate", {
                      template: `<b-badge id="label1" variant="success" ><i class="fa fa-plus"></i>&nbsp<span id="hide" v-text="$ml.get('add')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                switchTemplate: function () {
              return {
                  template: Vue.component("switchTemplate", {
                      template: `<b-badge id="label1" variant="warning" ><i class="fa fa-exchange"></i>&nbsp<span id="hide" v-text="$ml.get('switch')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
                deleteTemplate: function () {
              return {
                  template: Vue.component("deleteTemplate", {
                      template: `<b-badge id="label1" variant="primary" ><i class="fa fa-trash-o"></i>&nbsp<span id="hide" v-text="$ml.get('delete')"></span></b-badge>`,
                      data() {
                        return {
                          data: {
                          },
                        };
                      },
                    })
                  }
                },
          labelTemplate: function () {
              return {
                  template: Vue.component('labelTemplate', {
                      template: `<div ><b-badge id="label" style="ffont-weight:lighter;margin:3px" v-for="label in data.labels" id="label" :variant="label.color">{{label.label_name}}</b-badge>&nbsp;</div>`,
                  data: function() {
                          return {
                              data: {},
                          }
                      }
                })
              }
          },
          labels:[],
          formdata: {
                  label_name : "",
                  color : "#fff",
                  context : "Heads",
                  description : ""
                },
          editinput:{},
          editmodal:false,
          groupTemplate: function () {
              return {
                  template: groupVue
              }
          },
          something:true,
          groupTemplate1: function () {
              return {
                  template: groupVue1
              }
          },
    getflag:0,
          template1 : function(){
            return {  
              template : template1Vue
            }
          },
          template2 : function(){
            return {  
              template : template2Vue
            }
          },
          template3 : function(){
            return {  
              template : template3Vue
            }
          },
          template4 : function(){
            return {  
              template : template4Vue
            }
          },
          template5 : function(){
            return {  
              template : template5Vue
            }
          },
          template6 : function(){
            return {  
              template : template6Vue
            }
          },
          template7 : function(){
            return {  
              template : template7Vue
            }
          },
          template8 : function(){
            return {  
              template : template8Vue
            }
          },
          template9 : function(){
            return {  
              template : template9Vue
            }
          },
          template10 : function(){
            return {  
              template : template10Vue
            }
          },
          template11 : function(){
            return {  
              template : template11Vue
            }
          },
          template12 : function(){
            return {  
              template : template12Vue
            }
          },
          LabelModal:false,
          animationSettings: { effect: 'Zoom' },
          modal:false,
          link:"",
          key:"",
          addModal:false,
          head:[],
          selected:false,
          dept_fields:{groupBy:'parent_department',text:"department_name",value:"_id"},
             commands: [
                 { type:"Details",tooltipText : "Double click", buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat',click:this.onClick } },
                    ],
                    selected2:"Jan",
                height : window.innerHeight*0.65,
             filterSettings: { type: "Menu" },
             pageSettings: {pageSize:true,pageSize:200, pageSizes: [200,300,400,500], pageCount: 4} ,
             editSettings: { allowDeleting: true,mode: 'Dialog', allowAdding: true, newRowPosition: 'Child' },
             rowHeight: 30,
              toolbar: [
          'CsvExport','Search',
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Right' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Right' },
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Right' },
            ],
            selectionSettings : {type:"Single"},
            data: [],
            department:[],
            input:{

            },
            or_head:[],
            or_dept:[],
            currentView:"Budget",
            selectedLabel:null,
            module:null,
            isRoot:false,
            squarePalettesColn: 7,
        circlePaletteColors: {'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                    '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']},
            
   };
  },
  async mounted() {
      this.link = window.location.href;
     this.key = this.link.split(`head/`).pop()
        await api.get(`${apiUrl}`+`head/head/get`)
    .then((response) => {
        this.or_head = JSON.parse(JSON.stringify(response.data))
        this.data = this.list_to_tree_head(response.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
     api.get(`${apiUrl}`+`/super/settings/budget/budSet/get`).then((resp)=>{
          if(resp.data.fin_year_start_month == "Jan"){
            this.selected2 = "Jan";
          }else if(resp.data.fin_year_start_month == "Feb"){
            this.selected2 = "Feb";
          }else if(resp.data.fin_year_start_month == "Mar"){
            this.selected2 = "Mar";
          }else if(resp.data.fin_year_start_month == "Apr"){
            this.selected2 = "Apr";
          }else if(resp.data.fin_year_start_month == "May"){
            this.selected2 = "May";
          }else if(resp.data.fin_year_start_month == "Jun"){
            this.selected2 = "Jun";
          }else if(resp.data.fin_year_start_month == "Jul"){
            this.selected2 = "Jul";
          }else if(resp.data.fin_year_start_month == "Aug"){
            this.selected2 = "Aug";
          }else if(resp.data.fin_year_start_month == "Sep"){
            this.selected2 = "Sep";
          }else if(resp.data.fin_year_start_month == "Oct"){
            this.selected2 = "Oct";
          }else if(resp.data.fin_year_start_month == "Nov"){
            this.selected2 = "Nov";
          }else if(resp.data.fin_year_start_month == "Dec"){
            this.selected2 = "Dec";
          }else{
            this.selected2 = "Jan";
          }
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
     
     await axios.get(`${apiUrl}`+`department/dept/get`,{withCredentials:true}).then((res) => {
        this.or_dept = JSON.parse(JSON.stringify(res.data))
        this.department = this.list_to_tree_dept(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
     axios.get(`${apiUrl}`+`label/label/find/by/Heads`,{withCredentials:true}).then((res) => {
        this.labels = res.data
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
    },
  provide: {
      treegrid: [ ExcelExport,PdfExport,CommandColumn,Edit, Toolbar, Filter, Sort, Reorder, Page, Resize ]
   },
   methods:{
    delLabel(args,id,label) {
      console.log(this.editinput.labels.splice(label,1))
      var body = {
        labels : args
      }
      console.log(body)
      api.put(`${apiUrl}head/head/pop/label/${id}`,body).then((res) => {
        console.log(res.data)
      }).catch((err)=> {
        if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
      
    },
    addLabel (args) {
      this.addModal =false
              api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((label)=>{
                var id = {
                  labels :  label.data._id
                }
                  api.get(`${apiUrl}`+`label/label/find/by/Heads`).then((res) => {
                    this.labels = res.data
                  })
                console.log(this.editinput.labels)
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
      },
      selectLabel(args) {
        if(this.selectedLabel != null) {
        var label;
        api.get(`${apiUrl}label/label/get/one/${this.selectedLabel}`).then((res) => {
          label = res.data
          this.editinput.labels.push(label);
        }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })

        var data = {
          labels : this.selectedLabel
        }
        api.put(`${apiUrl}head/head/push/label/${args}`,data).then((res) => {
            
        }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
      }
      },
    list_to_tree_dept(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_department != undefined && this.checkExistDept(node.parent_department)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_department]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataDept(roots)
          return roots
      },
      convertDataDept(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataDept(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].department_name;
        delete roots[i]._id;
        delete roots[i].department_name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
    load(args) {
      
    },
    // addLabel (args) {
    //     this.$refs.dialogObj.hide();
    //     let val = this.$refs.treegrid.getSelectedRecords()
    //           api.post(`${apiUrl}`+`label/label/create`,this.formdata).then((response) =>{
    //             var id = {
    //               labels :  response.data._id
    //             }
    //             api.put(`${apiUrl}`+`head/head/push/label/`+`${val[0]._id}`,id).then((response)=>{
    //                 api.get(`${apiUrl}`+`head/head/get`)
    //                 .then((response) => {
    //                   this.data = response.data
    //                   });
    //             });
    //             this.formdata=null
    //           });
            
    //   },
    onChange(args) {
        this.formdata.color = args.currentValue.hex.slice(1);
      }, 
      addHead() {
        this.$validator.validate().then((valid) =>{
            if (!valid) {

            }
            else{
              let parent = this.$refs.treegrid.ej2Instances.getSelectedRecords();
              
              api.post(`${apiUrl}`+`head/head/create`,this.input).then((response) =>{
                
                  api.get(`${apiUrl}`+`head/head/get`)
                  .then((response) => {
                      this.or_head = JSON.parse(JSON.stringify(response.data))
                      this.data = this.list_to_tree_head(response.data)
                      this.modal = false     
                      this.input={}  
                });
                    
              }).catch((err)=> {
                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
            }
              
            
          });
      },
      editHead() {
        var sendData = {
          name:this.editinput.name,
          head_key:this.editinput.head_key,
          accounting_head:this.editinput.accounting_head,
          notes:this.editinput.notes,
          department:this.editinput.department,
          parent_head : this.editinput.parent_head
        }
        api.put(`${apiUrl}`+`head/head/update/one/`+`${this.editinput._id}`,sendData).then((response)=>{
            api.get(`${apiUrl}`+`head/head/get`)
                .then((response) => {
                    this.or_head = JSON.parse(JSON.stringify(response.data))
                    this.data = this.list_to_tree_head(response.data)
                  });
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
        this.editmodal = false
      },
      rowSelected(args) {
        this.selected = true
      },
      rowDeselecting(args) {
        this.selected = false
      },
      actionComplete(args) {
        if(args.action=="edit") {
          var id=args.data._id
          var sendData = {
            name:args.data.name,
            accounting_head:args.data.accounting_head,
            notes:args.data.notes,
            department:args.data.department,
            head_key:args.data.head_key
          }
          api.put(`${apiUrl}`+`head/head/update/one/`+`${id}`,sendData).then((response) => {
            api.get(`${apiUrl}`+`head/head/get`)
            .then((response) => {
                this.or_head = JSON.parse(JSON.stringify(response.data))
                this.data = this.list_to_tree_head(response.data)
              });
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
        }
      },
      beginEdit(args) {
        if(args.rowData.parentItem==null) {
          this.isRoot = true
          if(this.getflag==0) {
          this.head = this.data
          this.getflag=1
        }
        }
        else{
          this.isRoot = false
          if(this.getflag==0) {
          this.head = this.data
          this.getflag=1
        }
        }
        

        this.editmodal =true
        this.editinput = args.rowData
        this.editinput.department = args.rowData.department._id
      },
      checkExistDept(node) {
        for (var i=0; i < this.or_dept.length; i++) {
            if (this.or_dept[i]._id == node)
                return true;
        }
        return false;
      },
      checkExistHead(node) {
        for (var i=0; i < this.or_head.length; i++) {
            if (this.or_head[i]._id == node)
                return true;
        }
        return false;
      },
       onClick(args) {
            let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            if(data[0].user_type == "SuperAdmin" || 
               data[0].user_type == "Staff" || 
               data[0].user_type == "Vendor" ||
               data[0].user_type == "Student" || 
               data[0].user_type == "Guest") {
                this.$router.push(`/usertype/per/`+`${data[0].user_type}`)
            }
            else {
                this.$router.push(`/usertype/`+`${data[0].parentItem.user_type}/per/`+`${data[0]._id}`)
            }
       },

       Add(args) {
           let data = this.$refs.treegrid.ej2Instances.getSelectedRecords();
            if(data.user_type == "SuperAdmin" || 
                        data.user_type == "Staff" || 
                        data.user_type == "Vendor" ||
                        data.user_type == "Student" || 
                        data.user_type == "Guest") {
            }
       },
       failure: function(args) {
        debugger;
      },
      list_to_tree_head(list) {
          var map = {}, node, roots = [], i;
          for (i = 0; i < list.length; i += 1) {
              map[list[i]._id] = i; // initialize the map
              list[i].children = []; // initialize the children
          }
          for (i = 0; i < list.length; i += 1) {
              node = list[i];
              if (node.parent_head != undefined && this.checkExistHead(node.parent_head)) {
                  // if you have dangling branches check that map[node.parentId] exists
                  list[map[node.parent_head]].children.push(node);
              } else {
                  roots.push(node);
              }
          }
          this.convertDataHead(roots)
          return roots
      },
      convertDataHead(roots) {
        for(var i=0;i<roots.length;i++) {
            if(roots[i].children.length !=0) {
              this.convertDataHead(roots[i].children);
            }
            roots[i].id = roots[i]._id;
          roots[i].label = roots[i].name;
        if(roots[i].children.length<=0) {
          delete roots[i].children
        }
        }
      },
      onProgress(args) {
      },
      switchGraph() {
        this.something = false
        this.currentView = "Graph"
      },
      switchValue() {
        this.something = true
        this.currentView = "Budget"
      },
       onUploadSuccess: function (args) {
          var formData = new FormData();
          formData.append('csv',args.file.rawFile);
          formData.append('import_setting',"M");
          formData.append('year',"2019")
          this.upload = true
          console.log("req called");
          api.post(`${apiUrl}`+`csv/read/`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res)=>{
            console.log(res);
            // this.dataSourceSettings.dataSource = res.data[0];
          }).catch((err)=> {
            if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      })
          this.browseModal = false
          this.$router.go(0)
          // axios.post(`${apiUrl}`+`csv/read`,formData,{headers:{'Content-Type':'multipart/form-data'}}).then((res) => {
          //   this.dataSourceSettings.dataSource = res.data
          // })
        },
        onUploadFailed: function (args) {
            console.log('Upload fails');
        },
        onFileRemove: function (args) {
            args.postRawFile = false;
        },
  
      clickHandler(args){
        if(this.getflag==0) {
          this.head = this.data
    this.getflag=1
        }
        
        if(args.item.id === 'add') {
          this.modal =true
          }
          if(args.item.id=="upload") {
            this.browseModal = true
          }
          if(args.item.id === 'switch') {
          this.something=!this.something
          }
          if(args.item.id == 'collapse') {
            this.$refs.treegrid.collapseAll()
          }
          if(args.item.id == 'expand') {
            this.$refs.treegrid.expandAll()
          }
        if(args.item.id == 'delete') {
                            var data = this.$refs.treegrid.ej2Instances.getSelectedRecords()
                               api.delete(`${apiUrl}`+`head/head/delete/one/`+`${data[0].head_key}`).then((res)=>{
                                api.get(`${apiUrl}`+`head/head/get`)
                                .then((response) => {
                                  this.or_head = JSON.parse(JSON.stringify(response.data))
                                  this.data = this.list_to_tree_head(response.data)
                                  });
                              }).catch((err)=> {
                                if(err.toString().includes("Network Error")) {
        toast({
          type: VueNotifications.types.error,
          title: 'Network Error'
        })
    }
      });
                              
                            
                          }
        if (args.item.text === 'PDF Export') {
            this.$refs.treegrid.pdfExport({hierarchyExportMode: 'All'});
        }
         if (args.item.text === 'CSV Export') {
            this.$refs.treegrid.csvExport({hierarchyExportMode: 'All'});
        }
        if(args.item.id == 'label') {
            if(this.$refs.treegrid.getSelectedRecords().length>0) {
              this.$refs.dialogObj.show();
            }
            else { 
              alert("Please select a record to label it");
            }
          }
        if (args.item.id === 'small') {
            this.rowHeight = 20;
            }
        
        if (args.item.id === 'medium') {
            this.rowHeight = 30;
        }
        if (args.item.id === 'big') {
            this.rowHeight = 60;
        }
      },
    //    rowDataBound(args) {
    //             let value = this.$refs.rows.ej2Instances.value;
    //             let rowval = getValue('taskID', args.data );
    //             if (value.indexOf(rowval) !== -1) {
    //                 addClass([args.row as Element], 'disableRow');
    //             } else {
    //                 removeClass([args.row as Element], 'disableRow');
    //             }
    //         },
  },
  
        
};
</script>


<style>
@import '../../../styles/ejs-vue-base.css';
@import "../../../styles/ej2-vue-richtexteditor/styles/material.css";
@import "../../../styles/ej2-vue-lists/styles/material.css";
@import "../../../styles/ej2-vue-navigations/styles/material.css";
@import "../../../styles/ej2-vue-popups/styles/material.css";
@import "../../../styles/ej2-vue-splitbuttons/styles/material.css";
@import "../../../styles/ej2-vue-buttons/styles/material.css";
@import "../../../styles/ej2-vue-inputs/styles/material.css";
</style>
<style>
#label {
    font-weight:lighter;
  font-size:12px;
}
  .badge-f44336 {
    background-color:#f44336;
    color:white;
  }
  .badge-e91e63{
    background-color:#e91e63;
    color:white;
  }
  .badge-9c27b0{
    background-color:#9c27b0;
    color:white;
  }
  .badge-673ab7{
    background-color:#673ab7;
    color:white;
  }
  .badge-2196f3{
    background-color:#2196f3;
    color:white;
  }
  .badge-03a9f4{
    background-color:#03a9f4;
    color:white;
  }
  .badge-00bcd4{
    background-color:#00bcd4;
    color:white;
  }
  .badge-009688{
    background-color:#009688;
    color:white;
  }
  .badge-8bc34a{
    background-color:#8bc34a;
    color:white;
  }
  .badge-cddc39{
    background-color:#cddc39;
    color:black;
  }
  .badge-ffeb3b{
    background-color:#ffeb3b;
    color:black;
  }
  .badge-ffc107{
    background-color:#ffc107;
    color:black;
  }
    @font-face {
font-family: 'e-grid-rowheight';
src:
url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1uSfkAAAEoAAAAVmNtYXDOLM5rAAABkAAAAEJnbHlm/CWF1QAAAeAAAAGIaGVhZBRfqPEAAADQAAAANmhoZWEIUQQFAAAArAAAACRobXR4EAAAAAAAAYAAAAAQbG9jYQDyALYAAAHUAAAACm1heHABFAB4AAABCAAAACBuYW1l2jjwtgAAA2gAAAKRcG9zdJYOJ5oAAAX8AAAARgABAAAEAAAAAFwEAAAAAAAD9AABAAAAAAAAAAAAAAAAAAAABAABAAAAAQAAWBvKcl8PPPUACwQAAAAAANimsgAAAAAA2KayAAAAAAAD9AP0AAAACAACAAAAAAAAAAEAAAAEAGwABgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wHnBwQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAEAAAABAAAAAAAAAIAAAADAAAAFAADAAEAAAAUAAQALgAAAAYABAABAALnAucH//8AAOcB5wf//wAAAAAAAQAGAAgAAAACAAEAAwAAAAAAAAAuALYAxAAAAAYAAAAAA8UD9AADAAcACwAPABMAFwAANyE1ISchNSE1ITUhNyE1ITchNSEnITUhPQOH/HkCA4f8eQOH/HkCA4f8eQEDh/x5AQOH/HkMX1dfVl9WXlVfV18AAAAAAwAAAAAD9ANtACMARwBrAAA3FR8HIT8HNS8HIQ8GAxUfByE/BzUvByEPBgMVHwchPwc1LwchDwYMAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwIBAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwIBAQIDBQUHBwgDnAgHBwUFAwIBAQIDBQUHBwj8ZAgHBwUFAwLgJwgIBgYEBAIBAQIEBAYGCAgnCAcHBQUDAgEBAgMFBQcHASsmCQcHBQUDAgEBAgMFBQcHCSYICAcFBQMCAQECAwUFBwgBLCcIBwcFBQMCAQECAwUFBwcIJwgIBgYEBAIBAQIEBAYGCAAAAAABAAAAAAP0AlIAAwAAEyE1IQwD6PwYAa2mAAAAAAASAN4AAQAAAAAAAAABAAAAAQAAAAAAAQAQAAEAAQAAAAAAAgAHABEAAQAAAAAAAwAQABgAAQAAAAAABAAQACgAAQAAAAAABQALADgAAQAAAAAABgAQAEMAAQAAAAAACgAsAFMAAQAAAAAACwASAH8AAwABBAkAAAACAJEAAwABBAkAAQAgAJMAAwABBAkAAgAOALMAAwABBAkAAwAgAMEAAwABBAkABAAgAOEAAwABBAkABQAWAQEAAwABBAkABgAgARcAAwABBAkACgBYATcAAwABBAkACwAkAY8gZS1ncmlkLXJvd2hlaWdodFJlZ3VsYXJlLWdyaWQtcm93aGVpZ2h0ZS1ncmlkLXJvd2hlaWdodFZlcnNpb24gMS4wZS1ncmlkLXJvd2hlaWdodEZvbnQgZ2VuZXJhdGVkIHVzaW5nIFN5bmNmdXNpb24gTWV0cm8gU3R1ZGlvd3d3LnN5bmNmdXNpb24uY29tACAAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABSAGUAZwB1AGwAYQByAGUALQBnAHIAaQBkAC0AcgBvAHcAaABlAGkAZwBoAHQAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMQAuADAAZQAtAGcAcgBpAGQALQByAG8AdwBoAGUAaQBnAGgAdABGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIAB1AHMAaQBuAGcAIABTAHkAbgBjAGYAdQBzAGkAbwBuACAATQBlAHQAcgBvACAAUwB0AHUAZABpAG8AdwB3AHcALgBzAHkAbgBjAGYAdQBzAGkAbwBuAC4AYwBvAG0AAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQIBAwEEAQUADWFsaWduLWp1c3RpZnkEbWVudQVtaW51cwAAAAA=) format('truetype');
font-weight: normal;
font-style: normal;
}

    .e-small-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e707';
    }

   .e-medium-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e701';
    }

    .e-big-icon::before {
        font-family: 'e-grid-rowheight';
        content: '\e702';
    }
    #errors {
  color:red;
}
.bg-darkred { 
  background-color: #ce0000; 
 }
 .e-grid-min-height .e-rowcell {
     line-height: 1;
}
</style>