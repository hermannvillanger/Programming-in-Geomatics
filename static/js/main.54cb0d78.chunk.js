(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{135:function(e,t,n){},196:function(e,t,n){e.exports=n.p+"static/media/iconzoom.c135a649.svg"},197:function(e,t,n){e.exports=n.p+"static/media/iconsettings.674d9d35.svg"},198:function(e,t,n){e.exports=n.p+"static/media/iconinfo.7d03c90c.svg"},199:function(e,t,n){e.exports=n.p+"static/media/buffer.85c38da2.png"},200:function(e,t,n){e.exports=n.p+"static/media/intersection.77550d8c.png"},201:function(e,t,n){e.exports=n.p+"static/media/union.2145c9ab.png"},202:function(e,t,n){e.exports=n.p+"static/media/difference.d54ef46e.png"},203:function(e,t,n){e.exports=n.p+"static/media/select.ac5c793b.png"},206:function(e,t,n){e.exports=n(525)},37:function(e,t,n){},380:function(e,t,n){},506:function(e,t,n){},521:function(e,t,n){},523:function(e,t,n){},525:function(e,t,n){"use strict";n.r(t);n(207),n(373),n(374);var a=n(0),r=n.n(a),o=n(92),i=n.n(o),s=(n(380),n(8)),l=n(9),u=n(11),c=n(10),p=n(12),d=n(40),f=n(195),g=n.n(f),h=n(2),m=n.n(h),y="layer",v="operation",b=(m.a.number.isRequired,m.a.string.isRequired,m.a.object.isRequired,m.a.string.isRequired,m.a.number.isRequired,{number:"number",boolean:"boolean",string:"string"}),O=(n(37),n(506),n(135),n(93)),E=n.n(O),j=n(62),S=n(196),C=n.n(S),k=n(197),D=n.n(k),w=n(94),x=n.n(w),I={delete:"delete",zoom:"zoom",properties:"properties"};var L=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).handleClick=function(e){e===I.delete?n.props.onDelete(n.props.layer.id):e===I.zoom?n.props.onZoom(n.props.layer.id):e===I.properties&&n.props.openPopup(n.props.layer)},n.createContexMenu=function(){return r.a.createElement(j.a,{id:n.props.index.toString()},n.createContexMenuItem(I.properties,"Properties",D.a),r.a.createElement(j.c,{divider:!0}),n.createContexMenuItem(I.zoom,"Zoom to layer",C.a),r.a.createElement(j.c,{divider:!0}),n.createContexMenuItem(I.delete,"Delete layer",x.a))},n.createContexMenuItem=function(e,t,a){return r.a.createElement(j.c,{onClick:function(){return n.handleClick(e)}},t,r.a.createElement("img",{src:a,className:"icon",alt:""}))},n.clipName=function(){var e=n.props.layer.name;return e.length>24&&(e=(e=e.substring(0,25)).concat("...")),e},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.isDragging,a=t.isOver;return(0,t.connectDragSource)((0,t.connectDropTarget)(r.a.createElement("div",{className:"layer",style:{opacity:n?0:1,backgroundColor:a?"rgb(120, 120, 120)":"rgb(217, 217, 217)",overflow:"auto"}},r.a.createElement(j.b,{id:this.props.index.toString(),holdToDisplay:-1},r.a.createElement("span",null,this.clipName()),r.a.createElement("div",{style:{height:"20px",width:"20px",float:"left",backgroundColor:this.props.style.color}}),r.a.createElement("input",{type:"checkbox",style:{float:"right"},checked:this.props.visible,onChange:function(){return e.props.onToggle(e.props.layer.id)}})),this.createContexMenu())))}}]),t}(a.Component),T=E()(Object(d.DragSource)(y,{beginDrag:function(e){return{draggedId:e.layer.id,draggedIndex:e.index,draggedName:e.layer.name,draggedData:e.layer.data}}},function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}}),Object(d.DropTarget)(y,{canDrop:function(e,t){return t.getItem().draggedId!==e.layer.id},drop:function(e,t){if(!t.didDrop()){var n=t.getItem().draggedId;e.onMove(n,e.index)}}},function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver()}}))(L);function N(e,t){if(0===e.length)return"";for(var n="",a=0;a<e.length;a++){var r=e.charAt(a);isNaN(Number(r))||(n+=r)}return n.length>0?Number(n):null!==t?t:""}var P={name:"Name: ",color:"Color: ",opacity:"Opacity: "},F=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).handleTextInput=function(e,t,a){var r=e.target.value;n.setState(function(e){return{inputs:e.inputs.set(t,r)}})},n.handleRangeInput=function(e,t,a,r,o){var i=N(e.target.value,a);i=String(i).length>0?n.ValidateRangeInput(i/100,a,r,o):"",n.setState(function(e){return{inputs:e.inputs.set(t,i)}})},n.ValidateRangeInput=function(e,t,n,a){return Number(e)<n?e=n:Number(e)>a&&(e=a),e},n.applyChanges=function(){n.props.onNameChange(n.props.layer,n.state.inputs.get(P.name));var e=n.state.inputs.get(P.color),t=n.state.inputs.get(P.opacity);n.props.onStyleChange(n.props.layer.id,{color:e.length>0?e:null,opacity:String(t).length>0?t:null}),n.removeDialogue()},n.removeDialogue=function(){n.props.onDialogueFinished()},n.createPage=function(){return r.a.createElement(r.a.Fragment,null,n.textInput(P.name,n.state.inputs.get(P.name),n.handleTextInput),n.colorInput(P.color,n.state.inputs.get(P.color),n.handleTextInput),n.rangeInput(P.opacity,String(n.state.inputs.get(P.opacity)).length>0?100*n.state.inputs.get(P.opacity):"",0,1,n.handleRangeInput),r.a.createElement("button",{onClick:n.removeDialogue},"Cancel"),r.a.createElement("button",{onClick:n.applyChanges},"Apply"))},n.textInput=function(e,t,n){return r.a.createElement("div",null,e,r.a.createElement("input",{type:"text",value:t,onChange:function(a){return n(a,e,t)}}))},n.rangeInput=function(e,t,n,a,o){return r.a.createElement("div",null,e,r.a.createElement("input",{type:"text",style:{width:"50px"},value:t,onChange:function(r){return o(r,e,t,n,a)}}),"%")},n.colorInput=function(e,t,n){return r.a.createElement("div",null,e,r.a.createElement("input",{type:"color",value:t,onChange:function(a){return n(a,e,t)}}))};var a=new Map([[P.name,e.layer.name],[P.color,e.style.color],[P.opacity,e.style.opacity]]);return n.state={inputs:a},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"properties-menu"},"Layer properties",this.createPage())}}]),t}(a.Component),M=n(69),q=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).openPopup=function(e){n.setState({openPopup:!0,layer:e,style:n.props.stylemap.get(e.id)})},n.closePopup=function(){n.setState({openPopup:!1,layer:null,style:null})},n.state={openPopup:!1,layer:null,style:null},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"group-divider"},"Layers"),r.a.createElement(M.a,{open:this.state.openPopup,modal:!0,onClose:this.closePopup},r.a.createElement(F,{layer:this.state.layer,style:this.state.style,onNameChange:this.props.onNameChange,onStyleChange:this.props.onStyleChange,onDialogueFinished:this.closePopup})),this.props.layerlist.map(function(t,n){return r.a.createElement(T,{key:t.id,index:n,layer:t,visible:e.props.visiblemap.get(t.id),style:e.props.stylemap.get(t.id),onDelete:e.props.onDelete,onToggle:e.props.onToggle,onMove:e.props.onMove,onZoom:e.props.onZoom,openPopup:e.openPopup})}))}}]),t}(a.Component);var V=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.isDragging,n=e.isOver,a=e.connectDragSource,o=e.connectDropTarget,i=null!==this.props.layer,s=i&&this.props.inputLayers>1;return a(o(r.a.createElement("div",{className:"processing-field",style:{opacity:t?0:n?.8:1,border:i?"2px solid black":"2px dotted black",cursor:s?"pointer":"default"}},!i&&"Drop layer "+(this.props.index+1)+" here"||i&&this.props.layer.name)))}}]),t}(a.Component),R=E()(Object(d.DragSource)(v,{beginDrag:function(e){return{draggedId:e.layer.id,draggedName:e.layer.name,draggedData:e.layer.data}},canDrag:function(e){return e.inputLayers>1&&null!==e.layer}},function(e,t){return{connectDragSource:e.dragSource(),isDragging:t.isDragging()}}),Object(d.DropTarget)([y,v],{canDrop:function(e,t){if(null===e.layer)return!0;var n=t.getItem().draggedId;return e.layer.id!==n},drop:function(e,t){if(!t.didDrop()){var n=t.getItem(),a={id:n.draggedId,name:n.draggedName,data:n.draggedData};e.onDrop(a,e.index)}}},function(e,t){return{connectDropTarget:e.dropTarget(),isOver:t.isOver()}}))(V),U=n(198),A=n.n(U),z=function(e){function t(e){var n;Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).getDefaultValues=function(e){var t=null;return e&&(t=[],e.forEach(function(e){t.push(null!==e.defaultInput?e.defaultInput:"")})),t},n.createInputFields=function(){var e=n.props.operation.inputValues,t=null;return e&&(t=[],e.forEach(function(e,a){t.push(n.createInputField(e,a))})),t},n.createInputField=function(e,t){return e.inputType===b.boolean?r.a.createElement("div",{key:t},e.inputName,r.a.createElement("input",{type:"checkbox",checked:n.state.inputs[t],onChange:function(){return n.setState(function(e){var n=e.inputs;return n.splice(t,1,!n[t]),{inputs:n}})}})):r.a.createElement("div",{key:t},e.inputName,r.a.createElement("input",{type:"text",value:n.state.inputs[t],onChange:function(a){return n.handleInputValue(a,t,e)}}))},n.handleInputValue=function(e,t,a){var r=e.target.value;n.setState(function(e){var n;switch(a.inputType){case b.number:n=N(r,a.defaultInput);break;case b.string:n=String(r).length>0?r:a.defaultInput;break;default:n=a.defaultInput}var o=e.inputs;return o.splice(t,1,n),{inputs:o}})},n.createLayerFields=function(){for(var e=[],t=0;t<n.props.operation.inputLayers;t++)e.push(r.a.createElement(R,{key:t,index:t,inputLayers:n.props.operation.inputLayers,layer:n.state.layers[t],onSwap:n.handleSwap,onDrop:n.handleDrop}));return e},n.handleDrop=function(e,t){n.setState(function(a){var r,o=n.checkLayers(e.id,a.layers);return o>-1?r=n.handleSwap(o,t,a.layers):(r=a.layers).splice(t,1,e),{layers:r}})},n.checkLayers=function(e,t){return t.indexOf(t.find(function(t){return null!==t&&t.id===e}))},n.handleSwap=function(e,t,n){var a=n[e];return n.splice(e,1,n[t]),n.splice(t,1,a),n},n.handleReset=function(){n.setState(function(){var e=n.getDefaultValues(n.props.operation.inputValues);return{layers:new Array(n.props.operation.inputLayers).fill(null),inputs:e,processing:!1}})},n.processingStart=function(){var e=n.state,t=e.layers,a=e.inputs,r=n.props.operation;if(void 0===t.find(function(e){return null===e})){var o=!0;r.inputValues&&r.inputValues.forEach(function(e,t){null!==a[t]&&0!==String(a[t]).length&&typeof a[t]===e.inputType||(o=!1)}),o&&(n.props.popup?n.openPopup(t,a):n.startProcessing(t,a))}},n.startProcessing=function(e,t){n.setState({processing:!0});var a=n.props.operation.script(e,t);n.processFinished(a)},n.openPopup=function(){n.setState({processing:!0})},n.processFinished=function(e){null!==e?n.props.onProcessingDone(e):alert("The processed area is empty"),n.handleReset()},n.closePopup=function(){n.setState({processing:!1})};var a=n.getDefaultValues(e.operation.inputValues);return n.state={layers:new Array(e.operation.inputLayers).fill(null),inputs:a,processing:!1},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.listOpen,a=t.popup,o=a?this.props.operation.popupComponent:"div";return r.a.createElement("div",{className:"template"},r.a.createElement(M.a,{open:a&&this.state.processing,modal:!0,onClose:this.closePopup},r.a.createElement(o,{layers:this.state.layers,inputs:this.state.inputs,onExecute:this.processFinished,onClose:this.closePopup})),r.a.createElement("div",{style:{overflow:"auto"},onClick:function(){return e.props.onToggle(e.props.operation.name)}},this.props.operation.name,this.props.operation.info&&r.a.createElement(M.a,{trigger:r.a.createElement("img",{src:A.a,className:"info-icon",alt:""}),position:"right top",on:"hover"},r.a.createElement("img",{style:{width:"350px"},src:this.props.operation.info,alt:""}))),n&&r.a.createElement("div",null,this.createLayerFields(),this.createInputFields(),r.a.createElement("button",{onClick:function(){return e.handleReset()},disabled:this.state.processing},"Clear"),r.a.createElement("button",{onClick:function(){return e.processingStart()},disabled:this.state.processing},"Start")))}}]),t}(a.Component),B=n(20);function G(e,t){for(var n=[],a=0;a<e.length;a++){for(var r=Object.assign({},e[a]),o=0;o<t.length&&null!==(r=Object(B.difference)(r,t[o]));o++);null!==r&&n.push(r)}return n}var Z=n(199),J=n.n(Z),W=n(200),_=n.n(W),K=n(201),Q=n.n(K),$=n(202),H=n.n($),X=n(203),Y=n.n(X),ee={equal:"is Equal to",notEqual:"is not Equal to",greater:"is Greater than",less:"is Less than",greaterEqual:"is Greater or Equal to",lessEqual:"is Less or Equal to"},te={property:"property",operator:"operator",value:"value"},ne=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).loadAttributes=function(){var e=n.props.layers[0],t={};for(var a in e.data.features){var r=e.data.features[a];for(var o in r.properties){var i=r.properties[o];o in t?-1===t[o].indexOf(i)&&t[o].push(i):(t[o]=[i],n.setDataType(o,i))}}n.setState({properties:t})},n.setDataType=function(e,t){var a=null;a=isNaN(t)?b.string:b.number,n.setState(function(t){return{dataTypes:t.dataTypes.set(e,a)}})},n.onExecute=function(){var e=n.props.layers[0],t=Object.assign({},e.data);for(var a in t.features=[],e.data.features){var r=e.data.features[a];n.checkFilters(r.properties)&&t.features.push(r)}var o=n.state.name,i={name:o=o.length>0?o:"SP-"+e.name,data:t};n.props.onExecute(i)},n.checkFilters=function(e){var t=!0;for(var a in n.state.filters){var r=n.state.filters[a];n.fulfillCriteria(r,e[r.property])||(t=!1)}return t},n.fulfillCriteria=function(e,t){switch(e.operator){case ee.equal:return t===e.value;case ee.notEqual:return t!==e.value;case ee.greater:return t>e.value;case ee.less:return t<e.value;case ee.greaterEqual:return t>=e.value;case ee.lessEqual:return t<=e.value;default:return!1}},n.onCancel=function(){n.props.onClose()},n.addSelectField=function(){n.setState(function(e){var t=e.filters,a=Object.keys(e.properties)[0],r=n.getFilterForProperty(a,e);return t.push(r),{filters:t}})},n.getFilterForProperty=function(e,t){return{property:e,operator:n.getLegalComparators(t.dataTypes.get(e))[0],value:t.properties[e][0]}},n.getLegalComparators=function(e){switch(e){case b.string:return[ee.equal,ee.notEqual];case b.number:return Object.values(ee);default:return null}},n.deleteSelection=function(e){n.setState(function(t){var n=t.filters;return n.splice(e,1),{filters:n}})},n.handleSelectionUpdate=function(e,t,a){var r=e.target.value;n.setState(function(e){var o=e.filters,i=o[t];switch(a){case te.property:i=n.getFilterForProperty(r,e);break;case te.operator:i.operator=r;break;case te.value:i.value=r}return o.splice(t,1,i),{filters:o}})},n.createSelectFields=function(){var e=[],t=Object.keys(n.state.properties);return n.state.filters.forEach(function(a,o){o>0&&e.push(r.a.createElement("span",null,"and"));var i=n.getLegalComparators(n.state.dataTypes.get(a.property)),s=n.state.properties[a.property];e.push(r.a.createElement("div",{key:o},n.createSelectField(t,a.property,te.property,o),n.createSelectField(i,a.operator,te.operator,o),n.createSelectField(s,a.value,te.value,o),r.a.createElement("img",{src:x.a,alt:"",onClick:function(){return n.deleteSelection(o)}})))}),e},n.createSelectField=function(e,t,a,o){return r.a.createElement("select",{key:a,value:t,onChange:function(e){return n.handleSelectionUpdate(e,o,a)}},e.map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))},n.handleNameChange=function(e){var t=e.target.value;n.setState({name:t})},n.state={filters:[],properties:{},dataTypes:new Map,processing:!1,name:""},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.loadAttributes(),this.addSelectField()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("span",null,"Name of new layer: "),r.a.createElement("input",{type:"text",value:this.state.name,onChange:function(t){return e.handleNameChange(t)}}),r.a.createElement("span",null,r.a.createElement("br",null),"Select features from layer where:"),this.createSelectFields(),r.a.createElement("button",{onClick:this.addSelectField,disabled:this.state.processing},"Add filter"),r.a.createElement("button",{onClick:this.onCancel,disabled:this.state.processing},"Cancel"),r.a.createElement("button",{onClick:this.onExecute,disabled:this.state.processing||0===this.state.filters.length},"Start"))}}]),t}(a.Component),ae=[{name:"Buffer",inputLayers:1,inputValues:[re("Buffer value",100,b.number),re("Dissolve (slow)",!1,b.boolean)],script:function(e,t){var n=e[0],a=t[0],r=t[1],o={name:n.name+"-Buf-"+a+"m"},i=Object.assign({},n.data),s=Object(B.buffer)(n.data,a,{units:"meters"});return r&&(s.features=function(e){for(var t=Object.assign({},e[0]),n=1;n<e.length;n++)t=Object(B.union)(t,e[n]);return t.properties={geometryChanged:"yes"},[t]}(s.features)),i.features=s.features,o.data=i,o},info:J.a},{name:"Difference",inputLayers:2,inputValues:null,script:function(e,t){var n=e[0],a=e[1],r={name:n.name+"-Diff-"+a.name},o=Object.assign({},n.data),i=Object(B.buffer)(n.data,.1,{units:"meters"}),s=Object(B.buffer)(a.data,.1,{units:"meters"});return o.features=G(i.features,s.features),0===o.features.length?null:(r.data=o,r)},info:H.a},{name:"Intersection",inputLayers:2,inputValues:null,script:function(e,t){var n=e[0],a=e[1],r={name:n.name+"-Int-"+a.name},o=Object.assign({},n.data),i=Object(B.buffer)(n.data,.1,{units:"meters"}),s=Object(B.buffer)(a.data,.1,{units:"meters"});return o.features=function(e,t){var n=G(t,e);return G(t,n)}(i.features,s.features),0===o.features.length?null:(r.data=o,r)},info:_.a},{name:"Union(very slow)",inputLayers:2,inputValues:null,script:function(e,t){for(var n=e[0],a=e[1],r={name:n.name+"-Uni-"+a.name},o=Object.assign({},n.data),i=Object(B.buffer)(n.data,.1,{units:"meters"}),s=Object(B.buffer)(a.data,.1,{units:"meters"}),l=Object.assign({},i.features[0]),u=1;u<i.features.length;u++)l=Object(B.union)(l,i.features[u]);for(var c=Object.assign({},s.features[0]),p=1;p<s.features.length;p++)c=Object(B.union)(c,s.features[p]);return o.features=[Object(B.union)(l,c)],r.data=o,r},info:Q.a}];function re(e,t,n){return{inputName:e,defaultInput:t,inputType:n}}var oe,ie=[{name:"Select properties",inputLayers:1,inputValues:null,popupComponent:ne,info:Y.a}],se=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(o)))).state={operations:ae,componentOperations:ie,listOpen:null},n.handleToggle=function(e){n.setState(function(t){return t.listOpen===e?{listOpen:null}:{listOpen:e}})},n.createProcessingTemplate=function(e,t){return r.a.createElement(z,{key:e.name,operation:e,onToggle:n.handleToggle,onProcessingDone:n.props.onProcessingDone,listOpen:n.state.listOpen===e.name,popup:t})},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"group-divider"},"Geoprocessing"),this.state.componentOperations.map(function(t){return e.createProcessingTemplate(t,!0)}),this.state.operations.map(function(t){return e.createProcessingTemplate(t,!1)}))}}]),t}(a.Component),le=n(205),ue=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).handleUpload=function(e){var t=[];e.forEach(function(e){var n=e.name.toLowerCase();n.length>0&&(n.endsWith(".geojson")?t.push(e):alert("Not valid filetype: "+n))}),n.props.onUpload(t)},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(le.a,{className:"drop-zone",accept:".geojson",onDrop:function(t){e.handleUpload(t)}},r.a.createElement("span",null,"Click to upload files. Only geojson files can be uploaded")))}}]),t}(a.Component),ce=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{id:"sidebar",className:"navbar bg-light"},r.a.createElement(se,{onProcessingDone:this.props.onProcessingDone}),r.a.createElement(q,{layerlist:this.props.layerlist,visiblemap:this.props.visiblemap,stylemap:this.props.stylemap,onDelete:this.props.onDelete,onToggle:this.props.onToggle,onMove:this.props.onMove,onZoom:this.props.onZoom,onNameChange:this.props.onNameChange,onStyleChange:this.props.onStyleChange}),r.a.createElement(ue,{onUpload:this.props.onUpload}))}}]),t}(a.Component),pe=n(70),de=n.n(pe),fe=(n(519),n(521),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).state={mapid:"mapid",center:[63.42,10.39],zoom:14},n.zoomToLayer=function(e){var t=n.getLayerById(e);n.map.fitBounds(t.getBounds())},n.addLayer=function(e){var t=n.getLayerById(e.id);if(void 0===t)try{(t=de.a.geoJSON(e.data)).id=e.id,n.featuregroup.addLayer(t)}catch(a){n.props.onError(e.id)}return t},n.removeLayer=function(e){var t=n.getLayerById(e);void 0!==t&&n.featuregroup.removeLayer(t)},n.getLayerById=function(e){return n.featuregroup.getLayers().find(function(t){return t.id===e})},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.map=this.createMap(this.state.mapid),this.featuregroup=de.a.featureGroup(),this.featuregroup.addTo(this.map)}},{key:"createMap",value:function(e){var t=de.a.map(e).setView(this.state.center,this.state.zoom);return de.a.tileLayer("https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}",{attribution:'<a href="http://www.kartverket.no/">Kartverket</a>'}).addTo(t),t.zoomControl.setPosition("topright"),t}},{key:"componentDidUpdate",value:function(){var e=this;this.props.layerlist.forEach(function(t){if(e.props.visiblemap.get(t.id)){var n=e.addLayer(t),a=e.props.stylemap.get(t.id);n.setStyle({color:a.color,opacity:a.opacity}),n.bringToBack()}else e.removeLayer(t.id)})}},{key:"render",value:function(){return r.a.createElement("div",{id:this.state.mapid})}}]),t}(a.Component)),ge=(n(523),"gisdb"),he="layers",me=1,ye=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).dbInit=function(){var e=indexedDB.open(ge,me);e.onerror=function(e){alert("Error with indexeddb")},e.onupgradeneeded=function(t){e.result.createObjectStore(he,{keyPath:"id",autoIncrement:!0})},e.onsuccess=function(t){oe=e.result,n.loadLayers()}},n.loadLayers=function(){oe.transaction(he,"readonly").objectStore(he).getAll().onsuccess=function(e){n.addGeoJSONLayer(e.target.result)}},n.handleUpload=function(e){e.forEach(function(e){var t=null,a=new FileReader;a.onload=function(){try{var r=a.result;if(null!==(t=JSON.parse(r))){var o={name:e.name.toLowerCase().replace(".geojson",""),data:t};n.localSave(o)}}catch(i){return void alert("Error reading json file: "+i)}},a.readAsText(e)})},n.localSave=function(e){oe.transaction(he,"readwrite").objectStore(he).put(e).onsuccess=function(t){void 0===e.id&&(e.id=t.target.result,n.addGeoJSONLayer([e]))}},n.addGeoJSONLayer=function(e){e.forEach(function(e){console.log(e),n.setState(function(t){var a=t.layers;a.splice(0,0,e);var r=t.styles.get(e.id)?t.styles.get(e.id):n.setStyle(e.id);return{layers:a,visibility:t.visibility.set(e.id,!0),styles:t.styles.set(e.id,r)}})})},n.setStyle=function(e){return{color:function(e){var t=Math.round(16777215*Math.random()).toString(16),n=6-t.length;return"#"+"000000".substring(0,n)+t}(),opacity:.8}},n.handleDelete=function(e){n.deleteFromStorage(e),n.deleteFromState(e),n.deleteFromLeaflet(e)},n.handleZoom=function(e){n.leafletmap.current.zoomToLayer(e)},n.handleNameChange=function(e,t){e.name!==t&&t.length>0&&(e.name=t,n.localSave(e))},n.handleStyleChange=function(e,t){n.setState(function(n){var a=t.color,r=t.opacity,o=n.styles.get(e);return a=null!==a?a:o.color,r=null!==r?r:o.opacity,{styles:n.styles.set(e,{color:a,opacity:r})}})},n.deleteFromStorage=function(e){oe.transaction(he,"readwrite").objectStore(he).delete(e).onsuccess=function(e){}},n.deleteFromState=function(e){n.setState(function(t){return{layers:t.layers.filter(function(t){return t.id!==e})}})},n.deleteFromLeaflet=function(e){n.leafletmap.current.removeLayer(e)},n.handleError=function(e){n.handleDelete(e)},n.handleMove=function(e,t){n.setState(function(n){var a=function(e,t){var n=t.find(function(t){return t.id===e});return{index:t.indexOf(n),info:n}}(e,n.layers),r=n.layers;return r.splice(a.index,1),r.splice(t,0,a.info),{layers:r}})},n.handleProcessing=function(e){n.localSave(e)},n.handleToggle=function(e){n.setState(function(t){return{visibility:t.visibility.set(e,!t.visibility.get(e))}})},n.state={layers:[],visibility:new Map,styles:new Map},n.leafletmap=r.a.createRef(),n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.dbInit()}},{key:"componentWillUnmount",value:function(){oe.close()}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(ce,{layerlist:this.state.layers,visiblemap:this.state.visibility,stylemap:this.state.styles,onUpload:this.handleUpload,onDelete:this.handleDelete,onToggle:this.handleToggle,onMove:this.handleMove,onZoom:this.handleZoom,onNameChange:this.handleNameChange,onStyleChange:this.handleStyleChange,onProcessingDone:this.handleProcessing}),r.a.createElement(fe,{ref:this.leafletmap,layerlist:this.state.layers,visiblemap:this.state.visibility,stylemap:this.state.styles,onError:this.handleError}))}}]),t}(a.Component),ve=Object(d.DragDropContext)(g.a)(ye),be=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Oe(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(ve,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/Programming-in-Geomatics",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/Programming-in-Geomatics","/service-worker.js");be?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Oe(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):Oe(e)})}}()},94:function(e,t,n){e.exports=n.p+"static/media/icondelete.d36bd4a7.svg"}},[[206,2,1]]]);
//# sourceMappingURL=main.54cb0d78.chunk.js.map