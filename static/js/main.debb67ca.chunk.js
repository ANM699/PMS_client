(this.webpackJsonppms=this.webpackJsonppms||[]).push([[0],{116:function(e,t,a){e.exports={container:"_1OudY3eOKhometcdjAwwJe",block:"_3XQvD5xzQqFYVc82P0lIj5",todo:"F8xQiMGthcmBSQ-2y0WyE",doing:"_3iTTJmnixGLrDuefYG5tpt",done:"_27SZsenZ6rYbNWvlmf0x5x"}},132:function(e,t,a){e.exports={header:"_3KC7A6KeRiBRBNS8pjubt2",logout:"_2ZSJ5f9P9bbeghV5GDeiDl",trigger:"_1HT5wiUkXowZkSyhDkNL_r",title:"_3PD8D_5zvRE42Yw2v6pHeH"}},163:function(e,t,a){e.exports={container:"_28Yq8Uj4udGSGVy9BijsDd",title:"_3qdcpPcztQVfUl2awh8bA6",taskList:"r7XB1Ka3JINz4aqCER96g"}},178:function(e,t,a){e.exports={sider:"_1ouATjjGDUa7atLAzCEEI1",logo:"_11ozg1j2cLMixBMi6Bvoxz"}},233:function(e,t,a){e.exports={container:"_3cggNLZEWOO97z_1lNBvEc"}},234:function(e,t,a){e.exports={curSprint:"_21kfxKD7nJ8vn4TuGLGB3u"}},247:function(e,t,a){e.exports=a(421)},420:function(e,t,a){},421:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),o=a.n(c),l=a(45),i=a(68),s=a(32),u=a(8),m=a(240),d=a(52),p=a(210),f=a(211),h=a(36),E={username:"",email:"",msg:""};var b={projectName:"",startDate:null,endDate:null,description:"",msg:""};var v=a(90),g=[];var j=Object(d.combineReducers)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_SUCCESS":case"RECEIVE_USER":return t.data;case"RESET_USER":return Object(h.a)(Object(h.a)({},E),{},{msg:t.data});case"ERROR_MSG":return Object(h.a)(Object(h.a)({},e),{},{msg:t.data});default:return e}},project:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SWITCH_PROJECT":return t.data;case"RESET_PROJECT":return Object(h.a)(Object(h.a)({},b),{},{msg:t.data});case"ERROR_MSG":return Object(h.a)(Object(h.a)({},e),{},{msg:t.data});default:return e}},sprints:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVE_SPRINTS":return t.data;case"CREATE_SPRINT":return[].concat(Object(v.a)(e),[t.data]);default:return e}}}),y=Object(d.createStore)(j,Object(f.composeWithDevTools)(Object(d.applyMiddleware)(p.a))),k=a(24),O=a(25),x=a(27),C=a(26),w=a(428),S=a(434),I=a(430),D=a(435),_=a(38),T=a(436),N=a(437),R=a(39),F=a.n(R),P=a(96),M=a.n(P),Y=a(51),L=a.n(Y),A=a(78),U=a(175),B=a.n(U),G=a(30),V=a.n(G),q="http://mock";V.a.mock("".concat(q,"/users/login"),"post",(function(e){var t=V.a.mock("@id");return F.a.set("userId",t),{code:0,data:{username:JSON.parse(e.body).username,_id:t}}})),V.a.mock("".concat(q,"/users/register"),"post",(function(e){var t=JSON.parse(e.body);if("guoyunxiang"===t.username)return{code:1,msg:"\u7528\u6237\u540d\u5df2\u7ecf\u88ab\u6ce8\u518c"};var a=V.a.mock("@id");return F.a.set("userId",a),{code:0,data:{username:t.username,_id:a}}})),V.a.mock("".concat(q,"/users/user"),"get",(function(){return{code:0,data:{username:V.a.mock("@last"),_id:F.a.get("userId")}}})),V.a.mock("".concat(q,"/projects/list"),"get",(function(){var e=V.a.mock({"data|5-10":[{_id:"@id",projectName:"@ctitle",description:"@cparagraph(2,3)",startDate:"2020-07-14",endDate:"2020-12-24"}]}).data;return{code:0,data:Object(v.a)(e)}})),V.a.mock("".concat(q,"/projects/create"),"post",(function(e){return{code:0,data:Object(h.a)(Object(h.a)({},JSON.parse(e.body)),{},{_id:V.a.mock("@id")})}})),V.a.mock("".concat(q,"/projects/project"),"get",(function(){return{code:0,data:{projectName:V.a.mock("@ctitle"),description:V.a.mock("@cparagraph(2,3)"),_id:F.a.get("projectId"),startDate:"2020-07-14",endDate:"2020-12-24"}}})),V.a.mock("".concat(q,"/tasks/list"),"get",(function(){return Object(h.a)({code:0},V.a.mock({"data|10-20":[{_id:"@id",content:"@csentence","status|1":["todo","doing","done"],storyId:"@id",projectId:F.a.get("projectId"),"users|0-5":[{_id:"@id","avatar|1":["#f56a00","#7265e6","#00a2ae"],username:"@last"}]}]}))})),V.a.mock("".concat(q,"/projects/members"),"get",(function(){return Object(h.a)({code:0},V.a.mock({"data|8-12":[{_id:"@id","avatar|1":["#f56a00","#7265e6","#00a2ae"],username:"@last",email:"@email","roles|1-4":[{"color|1":["#f56a00","#7265e6","#00a2ae","#ffbf00"],"name|1":["\u9879\u76ee\u7ecf\u7406","\u524d\u7aef\u5f00\u53d1","\u540e\u7aef\u5f00\u53d1","UI\u8bbe\u8ba1"]}]}]}))})),V.a.mock("".concat(q,"/users/list"),"get",(function(){return Object(h.a)({code:0},V.a.mock({"data|5-8":[{_id:"@id","avatar|1":["#f56a00","#7265e6","#00a2ae"],username:"@last",email:"@email"}]}))})),V.a.mock("".concat(q,"/sprints/create"),"post",(function(e){return{code:0,data:Object(h.a)({_id:V.a.mock("@id")},JSON.parse(e.body))}})),V.a.mock("".concat(q,"/sprints/list"),"get",(function(){return{code:0,data:[{_id:V.a.mock("@id"),startDate:"2020-07-14",endDate:"2020-07-30"},{_id:V.a.mock("@id"),startDate:"2020-07-31",endDate:"2020-08-26"},{_id:V.a.mock("@id"),startDate:"2020-08-27",endDate:"2020-09-13"}]}}));function H(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";if("GET"===a){var n="";return Object.keys(t).forEach((function(e){n+=e+"="+t[e]+"&"})),n&&(n="?"+n.substring(0,n.length-1)),B.a.get("http://mock"+e+n)}return B.a.post("http://mock"+e,t)}var J=function(e){return H("/users/login",{username:e.username,password:e.password},"POST")},z=function(e){return H("/users/register",{username:e.username,password:e.password},"POST")},K=function(e){return H("/projects/create",{projectName:e.projectName,startDate:e.startDate,endDate:e.endDate,description:e.description},"POST")},W=function(e){return{type:"AUTH_SUCCESS",data:e}},Z=function(e){return{type:"ERROR_MSG",data:e}},Q=function(e){return{type:"RESET_USER",data:e}},X=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){e.props.login(t)},e.onFinishFailed=function(e){console.log("Failed:",e)},e.toRegister=function(){e.props.history.replace("/register")},e}return Object(O.a)(a,[{key:"render",value:function(){var e=F.a.get("userId"),t=this.props.user.msg;return e?r.a.createElement(s.a,{to:"/"}):r.a.createElement("div",{className:M.a.container},r.a.createElement("div",{className:M.a.content},r.a.createElement("div",{className:M.a.main},r.a.createElement(w.a,{wrapperCol:{span:24},name:"loginForm",initialValues:{remember:!0},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},r.a.createElement(w.a.Item,null,t?r.a.createElement(S.a,{type:"error",message:t,showIcon:!0}):null),r.a.createElement(w.a.Item,{name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01"}]},r.a.createElement(I.a,{prefix:r.a.createElement(T.a,{className:"site-form-item-icon"}),placeholder:"\u7528\u6237\u540d"})),r.a.createElement(w.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]},r.a.createElement(I.a.Password,{prefix:r.a.createElement(N.a,{className:"site-form-item-icon"}),placeholder:"\u5bc6\u7801"})),r.a.createElement(w.a.Item,null,r.a.createElement(D.b,null,r.a.createElement(_.a,{type:"primary",htmlType:"submit"},"\u767b\u5f55"),r.a.createElement(_.a,{htmlType:"button",onClick:this.toRegister},"\u6ce8\u518c\u8d26\u53f7")))))))}}]),a}(n.Component),$=Object(l.b)((function(e){return{user:e.user}}),{login:function(e){var t=e.username,a=e.password;return t&&a?function(){var t=Object(A.a)(L.a.mark((function t(a){var n,r;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,J(e);case 2:n=t.sent,0===(r=n.data).code?a(W(r.data)):a(Z(r.msg));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}():Z("\u8bf7\u8f93\u5165\u7528\u6237\u540d\u548c\u5bc6\u7801")}})(X),ee=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).onFinish=function(t){e.props.register(t),console.log("Success:",t)},e.onFinishFailed=function(e){console.log("Failed:",e)},e.toLogin=function(){e.props.history.replace("/login")},e}return Object(O.a)(a,[{key:"render",value:function(){var e=F.a.get("userId"),t=this.props.user.msg;return e?r.a.createElement(s.a,{to:"/"}):r.a.createElement("div",{className:M.a.container},r.a.createElement("div",{className:M.a.content},r.a.createElement("div",{className:M.a.main},r.a.createElement(w.a,{wrapperCol:{span:24},name:"loginForm",initialValues:{remember:!0},onFinish:this.onFinish,onFinishFailed:this.onFinishFailed},r.a.createElement(w.a.Item,null,t?r.a.createElement(S.a,{type:"error",message:t,showIcon:!0}):null),r.a.createElement(w.a.Item,{name:"username",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01"}]},r.a.createElement(I.a,{prefix:r.a.createElement(T.a,{className:"site-form-item-icon"}),placeholder:"\u7528\u6237\u540d"})),r.a.createElement(w.a.Item,{name:"password",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"}]},r.a.createElement(I.a.Password,{prefix:r.a.createElement(N.a,{className:"site-form-item-icon"}),placeholder:"\u5bc6\u7801"})),r.a.createElement(w.a.Item,{name:"password2",rules:[{required:!0,message:"\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801\uff01"}]},r.a.createElement(I.a.Password,{prefix:r.a.createElement(N.a,{className:"site-form-item-icon"}),placeholder:"\u5bc6\u7801"})),r.a.createElement(w.a.Item,null,r.a.createElement(D.b,null,r.a.createElement(_.a,{type:"primary",htmlType:"submit"},"\u6ce8\u518c"),r.a.createElement(_.a,{htmlType:"button",onClick:this.toLogin},"\u5df2\u6709\u8d26\u53f7")))))))}}]),a}(n.Component),te=Object(l.b)((function(e){return{user:e.user}}),{register:function(e){var t=e.username,a=e.password,n=e.password2;return t&&a&&n?a!==n?Z("\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4"):function(){var t=Object(A.a)(L.a.mark((function t(a){var n,r;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,z(e);case 2:n=t.sent,0===(r=n.data).code?a(W(r.data)):a(Z(r.msg));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}():Z("\u8bf7\u8f93\u5165\u7528\u6237\u540d\u548c\u5bc6\u7801")}})(ee),ae=a(105),ne=a(422),re=a(429),ce=a(449),oe=a(102),le=a(438),ie=a(439),se=a(440),ue=a(441),me=a(442),de=a(443),pe=a(444),fe=a(178),he=a.n(fe),Ee=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).menuList=[{path:"/project/profile",title:"\u9879\u76ee\u72b6\u6001",icon:r.a.createElement(le.a,null)},{path:"/project/member",title:"\u6210\u5458\u7ba1\u7406",icon:r.a.createElement(ie.a,null)},{path:"/project/story",title:"\u9700\u6c42\u5206\u6790",icon:r.a.createElement(se.a,null)},{path:"/project/sprint",title:"\u9636\u6bb5\u8bbe\u7f6e",icon:r.a.createElement(ue.a,null)},{path:"/project/board",title:"\u4efb\u52a1\u770b\u677f",icon:r.a.createElement(me.a,null)},{path:"/project/meeting",title:"\u4f1a\u8bae\u7eaa\u8981",icon:r.a.createElement(de.a,null)},{path:"",title:"\u71c3\u5c3d\u56fe",icon:r.a.createElement(pe.a,null)}],e}return Object(O.a)(a,[{key:"render",value:function(){var e=this,t=this.props.visiable,a=this.props.history.location.pathname,n=this.menuList.findIndex((function(e){return e.path===a})).toString();return r.a.createElement(ne.a.Sider,{trigger:null,collapsible:!0,collapsed:this.props.collapsed,className:he.a.sider,style:{display:t?"":"none"}},r.a.createElement("div",{className:he.a.logo},"PMS"),r.a.createElement(oe.a,{theme:"dark",mode:"inline",selectedKeys:[n]},this.menuList.map((function(t,a){return r.a.createElement(oe.a.Item,{key:a,icon:t.icon,onClick:function(){t.path&&e.props.history.replace(t.path)}},t.title)}))))}}]),a}(n.Component),be=Object(s.g)(Ee),ve=a(431),ge=a(445),je=a(446),ye=a(447),ke=a(132),Oe=a.n(ke),xe=function(e){return r.a.createElement(ne.a.Header,{className:Oe.a.header},e.visiable&&r.a.createElement(e.collapsed?ge.a:je.a,{className:Oe.a.trigger,onClick:e.toggle}),r.a.createElement("div",{className:Oe.a.title},r.a.createElement(i.b,{to:"/"},e.projectName)),r.a.createElement("div",null,r.a.createElement(ve.a,{style:{backgroundColor:"#00a2ae",marginRight:8},icon:r.a.createElement(T.a,null)}),e.username),r.a.createElement(ye.a,{className:Oe.a.logout,onClick:e.logout}))},Ce=a(427),we=a(450),Se=a(425),Ie=a(448),De=Se.a.Column;function _e(e){var t=e.data;return r.a.createElement(Se.a,{dataSource:t,pagination:!1,showHeader:!1,rowKey:"_id"},r.a.createElement(De,{title:"\u4fe1\u606f",dataIndex:"projectName",key:"projectName",render:function(t,a){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,r.a.createElement("a",{onClick:function(){return e.onConfirm(a)}},t)),r.a.createElement("div",{style:{color:"rgba(0,0,0,.45)",marginTop:"4px"}},a.description))}}),r.a.createElement(De,{title:"\u65f6\u95f4",key:"date",render:function(e,t){return"".concat(t.startDate,"~").concat(t.endDate)}}),r.a.createElement(De,{title:"\u64cd\u4f5c",dataIndex:"_id",key:"action",render:function(t){return r.a.createElement("a",{onClick:function(){e.onItemEditClick(t)}},r.a.createElement(Ie.a,null))}}))}var Te=a(160),Ne=a(426),Re=a(50),Fe=a.n(Re),Pe=Ne.a.RangePicker;function Me(e){var t=e.visible,a=e.onOk,c=e.onCancel,o=e.project,l=w.a.useForm(),i=Object(Te.a)(l,1)[0];return Object(n.useEffect)((function(){if(o){var e=[Fe()(o.startDate),Fe()(o.endDate)];i.setFieldsValue(Object(h.a)(Object(h.a)({},o),{},{rangeDate:e}))}else i.resetFields()}),[i,o]),r.a.createElement(re.a,{title:o?"\u7f16\u8f91\u9879\u76ee":"\u521b\u5efa\u9879\u76ee",width:640,visible:t,onOk:function(){i.validateFields().then((function(e){a(e),i.resetFields()})).catch((function(e){console.log("\u9a8c\u8bc1\u5931\u8d25\uff1a",e)}))},onCancel:c,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},r.a.createElement(w.a,{form:i,labelCol:{span:5},wrapperCol:{span:16}},r.a.createElement(w.a.Item,{name:"projectName",label:"\u9879\u76ee\u540d\u79f0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u9879\u76ee\u540d\u79f0\uff01"}]},r.a.createElement(I.a,{placeholder:"\u8bf7\u8f93\u5165"})),r.a.createElement(w.a.Item,{name:"rangeDate",label:"\u9879\u76ee\u65f6\u95f4",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9009\u62e9\u9879\u76ee\u65f6\u95f4\uff01"}]},r.a.createElement(Pe,{style:{width:"100%"}})),r.a.createElement(w.a.Item,{name:"description",label:"\u9879\u76ee\u7b80\u4ecb",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u81f3\u5c11\u4e94\u4e2a\u5b57\u7b26\u7684\u9879\u76ee\u7b80\u4ecb\uff01",min:5}]},r.a.createElement(I.a.TextArea,{rows:4,placeholder:"\u8bf7\u8f93\u5165\u81f3\u5c11\u4e94\u4e2a\u5b57\u7b26"}))))}var Ye=function(e){return{type:"SWITCH_PROJECT",data:e}},Le=function(e){return{type:"RESET_PROJECT",data:e}},Ae=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={visible:!1,projectList:[],current:null},e.showModal=function(t){var a=null;t&&(a=e.state.projectList.find((function(e){return e._id===t}))),e.setState({visible:!0,current:a})},e.handleConfirm=function(t){var a=Object(ae.a)(e);re.a.confirm({title:"\u9009\u62e9\u5e76\u5207\u6362\u81f3\u8be5\u9879\u76ee\uff1f",icon:r.a.createElement(ce.a,null),cancelText:"\u53d6\u6d88",okText:"\u786e\u5b9a",onOk:function(){a.props.switchProject(t),F.a.set("projectId",t._id),a.props.history.push("/project/profile")}})},e.handleOk=function(t){var a=t.rangeDate;t.startDate=a[0].format("YYYY-MM-DD"),t.endDate=a[1].format("YYYY-MM-DD"),K(t).then((function(t){var a=t.data;0===a.code&&e.setState({projectList:[a.data].concat(Object(v.a)(e.state.projectList)),visible:!1})}))},e.handleCancel=function(){e.setState({visible:!1})},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){var e=this;H("/projects/list").then((function(t){var a=t.data;0===a.code&&e.setState({projectList:a.data})}))}},{key:"render",value:function(){var e=this.state,t=e.projectList,a=e.current;return r.a.createElement("div",null,r.a.createElement(Ce.a,{title:"\u6211\u7684\u9879\u76ee",extra:r.a.createElement("a",{onClick:this.showModal},r.a.createElement(we.a,{style:{fontSize:"24px"}}))},r.a.createElement(_e,{data:t,onConfirm:this.handleConfirm,onItemEditClick:this.showModal})),r.a.createElement(Me,{visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel,project:a}))}}]),a}(n.Component),Ue={switchProject:Ye},Be=Object(l.b)((function(e){return{project:e.project}}),Ue)(Ae),Ge=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){return Object(k.a)(this,a),t.apply(this,arguments)}return Object(O.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"\u5f53\u524d\u5904\u4e8e\u7b2c2\u4e2a\u5468\u671f(2020-9-13~2020-10-10)\uff0c\u8be5\u5468\u671f\u5171\u6709\u4efb\u52a130\u4e2a\uff0c\u5176\u4e2d3\u4e2a\u4efb\u52a1\u4e3a\u4e0a\u4e2a\u5468\u671f\u9057\u7559\u3002"),r.a.createElement("div",null,"\u76ee\u524d\u672a\u5f00\u59cb10\u4e2a\uff0c\u8fdb\u884c\u4e2d10\u4e2a\uff0c\u5df2\u7ed3\u675f10\u4e2a\u3002"))}}]),a}(n.Component),Ve=a(432),qe=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){return Object(k.a)(this,a),t.apply(this,arguments)}return Object(O.a)(a,[{key:"render",value:function(){return r.a.createElement(Ce.a,null,r.a.createElement(Ve.a,{size:"middle",title:"\u9636\u6bb5\u4f8b\u4f1a",bordered:!0,column:2},r.a.createElement(Ve.a.Item,{label:"\u4f1a\u8bae\u65f6\u95f4"},"2020-09-12"),r.a.createElement(Ve.a.Item,{label:"\u4f1a\u8bae\u5730\u70b9"},"302"),r.a.createElement(Ve.a.Item,{label:"\u53c2\u4f1a\u4eba\u5458",span:2},"\u5f20\u4e09\uff0c\u674e\u56db\uff0c\u738b\u4e94"),r.a.createElement(Ve.a.Item,{label:"\u4f1a\u8bae\u5185\u5bb9",span:2},"Data disk type: MongoDB",r.a.createElement("br",null),"Database version: 3.4",r.a.createElement("br",null),"Package: dds.mongo.mid",r.a.createElement("br",null),"Storage space: 10 GB",r.a.createElement("br",null),"Replication factor: 3",r.a.createElement("br",null),"Region: East China 1"),r.a.createElement(Ve.a.Item,{label:"\u5f85\u529e\u4e8b\u9879"},"Data disk type: MongoDB",r.a.createElement("br",null),"Database version: 3.4",r.a.createElement("br",null),"Package: dds.mongo.mid",r.a.createElement("br",null),"Storage space: 10 GB",r.a.createElement("br",null),"Replication factor: 3",r.a.createElement("br",null),"Region: East China 1")))}}]),a}(n.Component),He=a(113),Je=a(159),ze=a(451),Ke=a(89),We=a(233),Ze=a.n(We),Qe=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){return Object(k.a)(this,a),t.apply(this,arguments)}return Object(O.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(He.b,{draggableId:this.props.task._id,index:this.props.index},(function(t,a){return r.a.createElement("div",Object.assign({className:Ze.a.container,ref:t.innerRef},t.draggableProps,t.dragHandleProps),r.a.createElement(Ce.a,{hoverable:!0},r.a.createElement("p",null,e.props.task.content),r.a.createElement("div",{style:{textAlign:"right"}},r.a.createElement(ve.a.Group,null,e.props.task.users.map((function(e){return r.a.createElement(Ke.a,{key:e._id,title:e.username,placement:"top"},r.a.createElement(ve.a,{style:{backgroundColor:e.avatar},icon:r.a.createElement(T.a,null)}))}))))))}))}}]),a}(n.Component),Xe=a(163),$e=a.n(Xe),et=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){return Object(k.a)(this,a),t.apply(this,arguments)}return Object(O.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:$e.a.container},r.a.createElement("h4",{className:$e.a.title,style:{backgroundColor:this.props.title.color}},this.props.title.display),r.a.createElement(He.c,{droppableId:this.props.id},(function(t){return r.a.createElement("div",Object.assign({className:$e.a.taskList,ref:t.innerRef},t.droppableProps),e.props.tasks.map((function(e,t){return r.a.createElement(Qe,{key:e._id,task:e,index:t})})),t.placeholder)})))}}]),a}(n.Component),tt=a(243),at=Se.a.Column;function nt(e){var t=e.data,a=e.status;return r.a.createElement(Se.a,{dataSource:t,pagination:!1,showHeader:!1,rowKey:"_id"},r.a.createElement(at,{width:"90px",title:"\u72b6\u6001",dataIndex:"status",key:"status",render:function(e){var t=a[e];return r.a.createElement(tt.a,{color:t.color},t.display)}}),r.a.createElement(at,{title:"\u4efb\u52a1\u5185\u5bb9",dataIndex:"content",key:"content"}),r.a.createElement(at,{title:"\u53c2\u4e0e\u8005",dataIndex:"users",key:"users",render:function(e){return r.a.createElement(ve.a.Group,null,e.map((function(e){return r.a.createElement(Ke.a,{key:e._id,title:e.username,placement:"top"},r.a.createElement(ve.a,{style:{backgroundColor:e.avatar},icon:r.a.createElement(T.a,null)}))})))}}))}var rt={todo:{color:"#4a9ff9",display:"\u672a\u5f00\u59cb"},doing:{color:"#f9944a",display:"\u8fdb\u884c\u4e2d"},done:{color:"#2ac06d",display:"\u5df2\u5b8c\u6210"}},ct=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={value:"board",tasks:{todo:[],doing:[],done:[]}},e.onChange=function(t){e.setState({value:t.target.value})},e.onDragEnd=function(t){var a=t.destination,n=t.source,r=t.draggableId;if(a&&(a.droppableId!==n.droppableId||a.index!==n.index)){var c=n.droppableId,o=a.droppableId,l=e.state.tasks[c].find((function(e){return e._id===r}));l.status=o;var i=e.state.tasks,s=i[c],u=i[o];s.splice(n.index,1),u.splice(a.index,0,l),e.setState({tasks:i})}},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){var e=this;H("/tasks/list").then((function(t){var a=t.data;if(0===a.code){var n=a.data,r=e.state.tasks;n.forEach((function(e){r[e.status].push(e)})),e.setState({tasks:r})}}))}},{key:"render",value:function(){var e=this.state,t=e.tasks,a=e.value,n=Object.values(t).flat(),c=r.a.createElement(He.a,{onDragEnd:this.onDragEnd},r.a.createElement("div",{style:{display:"flex"}},Object.keys(t).map((function(e,a){return r.a.createElement(et,{title:rt[e],id:e,key:a,tasks:t[e]})})))),o=r.a.createElement(nt,{data:n,status:rt});return r.a.createElement(Ce.a,{title:"\u9636\u6bb5",extra:r.a.createElement(Je.a.Group,{buttonStyle:"solid",onChange:this.onChange,value:this.state.value},r.a.createElement(Je.a.Button,{value:"board"},r.a.createElement(me.a,null)),r.a.createElement(Je.a.Button,{value:"list"}," ",r.a.createElement(ze.a,null)))},"board"===a?c:o)}}]),a}(n.Component),ot=a(423),lt=a(452),it=a(129),st=it.a.Option;function ut(e){var t=e.visible,a=e.onOk,n=e.onCancel,c=e.member,o=e.users,l=e.roles,i=w.a.useForm(),s=Object(Te.a)(i,1)[0];return r.a.createElement(re.a,{forceRender:!0,title:c?"\u7f16\u8f91\u6210\u5458":"\u6dfb\u52a0\u6210\u5458",width:640,visible:t,onOk:function(){s.validateFields().then((function(e){a(e),s.resetFields()})).catch((function(e){console.log("\u9a8c\u8bc1\u5931\u8d25\uff1a",e)}))},onCancel:n,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},r.a.createElement(w.a,{form:s,labelCol:{span:5},wrapperCol:{span:16}},r.a.createElement(w.a.Item,{name:"_id",label:"\u9879\u76ee\u6210\u5458",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9879\u76ee\u6210\u5458\uff01"}]},r.a.createElement(it.a,{showSearch:!0,placeholder:"\u9009\u62e9\u6210\u5458",optionFilterProp:"children",filterOption:function(e,t){return console.log(t),t.children.toLowerCase().indexOf(e.toLowerCase())>=0}},o.map((function(e,t){return r.a.createElement(st,{key:t,value:e._id},e.username)})))),r.a.createElement(w.a.Item,{name:"roles",label:"\u6210\u5458\u89d2\u8272",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6210\u5458\u89d2\u8272\uff01"}]},r.a.createElement(it.a,{mode:"multiple",allowClear:!0,placeholder:"\u9009\u62e9\u89d2\u8272"},l.map((function(e,t){return r.a.createElement(st,{key:t,value:e.name},e.name)}))))))}var mt=[{color:"#f56a00",name:"\u9879\u76ee\u7ecf\u7406"},{color:"#7265e6",name:"\u524d\u7aef\u5f00\u53d1"},{color:"#00a2ae",name:"\u540e\u7aef\u5f00\u53d1"},{color:"#ffbf00",name:"UI\u8bbe\u8ba1"}],dt=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={users:[],members:[],visible:!1},e.columns=[{title:"\u6210\u5458",dataIndex:"username",render:function(e,t){return r.a.createElement(D.b,null,r.a.createElement(ve.a,{style:{backgroundColor:t.avatar},icon:r.a.createElement(T.a,null)}),r.a.createElement("a",null,e))}},{title:"\u90ae\u7bb1",dataIndex:"email",render:function(e){return r.a.createElement("div",{style:{color:"rgba(0,0,0,.45)"}},e)}},{title:"\u89d2\u8272",dataIndex:"roles",render:function(e){return e.map((function(e,t){return r.a.createElement(tt.a,{key:t,color:e.color},e.name)}))}},{title:"\u64cd\u4f5c",dataIndex:"_id",key:"action",render:function(t){return r.a.createElement(ot.a,{placement:"left",title:"\u786e\u8ba4\u5220\u9664\u8be5\u6210\u5458\uff1f",onConfirm:function(){return e.handleDel(t)},okText:"\u786e\u8ba4",cancelText:"\u53d6\u6d88"},r.a.createElement("a",{key:"delete"},r.a.createElement(lt.a,null)))}}],e.handleDel=function(t){var a=e.state.members.filter((function(e){return e._id!==t}));e.setState({members:a})},e.showModal=function(){e.setState({visible:!0})},e.handleOk=function(t){var a=e.state.users.find((function(e){return e._id===t._id})),n=e.state.users.filter((function(e){return e._id!==t._id})),r=mt.filter((function(e){return-1!==t.roles.findIndex((function(t){return e.name===t}))})),c=[Object(h.a)(Object(h.a)({},a),{},{roles:r})].concat(Object(v.a)(e.state.members));e.setState({members:c,users:n,visible:!1})},e.handleCancel=function(){e.setState({visible:!1})},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){var e=this;H("/projects/members").then((function(t){var a=t.data;if(0===a.code){var n=a.data;e.setState({members:n})}})),H("/users/list").then((function(t){var a=t.data;if(0===a.code){var n=a.data;e.setState({users:n})}}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Ce.a,{title:"\u9879\u76ee\u6210\u5458",extra:r.a.createElement("a",{onClick:this.showModal},r.a.createElement(we.a,{style:{fontSize:"24px"}}))},r.a.createElement(Se.a,{showHeader:!1,pagination:!1,rowKey:"_id",columns:this.columns,dataSource:this.state.members})),r.a.createElement(ut,{visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel,member:null,users:this.state.users,roles:mt}))}}]),a}(n.Component),pt=a(424),ft=a(453),ht=a(116),Et=a.n(ht);var bt=function(e){function t(e,t){for(var a=[],n=0;n<e;n++){var c=r.a.createElement("div",{key:n,className:"".concat(Et.a.block," ").concat(t)});a.push(c)}return a}return r.a.createElement("div",{className:Et.a.container},t(e.todo,Et.a.todo),t(e.doing,Et.a.doing),t(e.done,Et.a.done))},vt=Se.a.Column,gt=[{color:"#2ac06d",display:"\u4f4e"},{color:"#f9944a",display:"\u4e2d"},{color:"#ff4d4f",display:"\u9ad8"}],jt=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={visible:!1,stories:[{_id:"1232312313",role:"\u7528\u6237",activity:"\u9009\u62e9\u9996\u9875\u5f39\u51fa\u7684\u6807\u7b7e",date:"2010-1-1",priority:2,businessValue:"\u5206\u6790\u7528\u6237\u753b\u50cf\uff0c\u667a\u80fd\u63a8\u8350\u5206\u6790\u7528\u6237\u753b\u50cf\uff0c\u667a\u80fd\u63a8\u8350",tasks:[1,2,3,4,5,6,7,8,9]}]},e.showModal=function(){e.setState({visible:!0})},e.handleCancel=function(t){e.setState({visible:!1})},e}return Object(O.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Ce.a,{title:"\u9879\u76ee\u9700\u6c42",extra:r.a.createElement("a",{onClick:this.showModal},r.a.createElement(we.a,{style:{fontSize:"24px"}}))},r.a.createElement(Se.a,{dataSource:this.state.stories,pagination:!1,rowKey:"_id"},r.a.createElement(vt,{width:"80px",title:"\u4f18\u5148\u7ea7",dataIndex:"priority",key:"priority",render:function(e){var t=gt[e];return r.a.createElement(tt.a,{style:{width:"40px",textAlign:"center"},color:t.color},t.display)}}),r.a.createElement(vt,{title:"\u89d2\u8272",dataIndex:"role",key:"role"}),r.a.createElement(vt,{title:"\u884c\u4e3a",dataIndex:"activity",key:"activity"}),r.a.createElement(vt,{title:"\u76ee\u7684",dataIndex:"businessValue",key:"businessValue",progress:!0}),r.a.createElement(vt,{title:"\u4efb\u52a1\u8fdb\u5ea6",key:"progress",render:function(){return r.a.createElement(i.b,{to:"/project/board"},r.a.createElement(bt,{todo:3,doing:5,done:4}))}}),r.a.createElement(vt,{title:"\u63d0\u51fa\u65e5\u671f",dataIndex:"date",key:"date"}),r.a.createElement(vt,{title:"\u64cd\u4f5c",key:"tasks",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",null,r.a.createElement(Ie.a,null)),r.a.createElement(pt.a,{type:"vertical"}),r.a.createElement("a",null,r.a.createElement(ft.a,null)))}}))),r.a.createElement(re.a,{title:"\u65b0\u589e\u9700\u6c42",width:480,visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"}))}}]),a}(n.Component),yt=a(454),kt=function(e){return{type:"CREATE_SPRINT",data:e}},Ot=a(234),xt=a.n(Ot),Ct=Ne.a.RangePicker,wt=Se.a.Column,St=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={visible:!1},e.showModal=function(){e.setState({visible:!0})},e.handleCancel=function(t){e.setState({visible:!1})},e.handleOk=function(t){e.form.validateFields().then((function(t){var a=t.rangeDate,n=a[0].format("YYYY-MM-DD"),r=a[1].format("YYYY-MM-DD");e.props.createSprint({startDate:n,endDate:r}),e.setState({visible:!1}),e.form.resetFields()})).catch((function(e){console.log("\u9a8c\u8bc1\u5931\u8d25\uff1a",e)}))},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){this.props.getSprints()}},{key:"render",value:function(){var e=this,t=this.props.project,a=t.startDate,n=t.endDate,c=this.props.sprints,o=c.length,l=a;if(o>0){var s=c[o-1].endDate;l=Fe()(s).add(1,"days").format("YYYY-MM-DD")}return r.a.createElement("div",null,r.a.createElement(Ce.a,{title:"\u9879\u76ee\u9636\u6bb5",extra:r.a.createElement("a",{onClick:this.showModal},r.a.createElement(we.a,{style:{fontSize:"24px"}}))},r.a.createElement(Se.a,{dataSource:c,pagination:!1,rowKey:"_id",rowClassName:function(e){return Fe()().isBetween(e.startDate,e.endDate,null,"[]")?xt.a.curSprint:null}},r.a.createElement(wt,{title:"\u9636\u6bb5\u65f6\u95f4",key:"date",render:function(e,t){return"".concat(t.startDate,"~").concat(t.endDate)}}),r.a.createElement(wt,{title:"\u4efb\u52a1\u8fdb\u5ea6",key:"status",render:function(){return r.a.createElement(i.b,{to:"/project/board"},r.a.createElement(bt,{todo:3,doing:5,done:4}))}}),r.a.createElement(wt,{title:"\u64cd\u4f5c",key:"tasks",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("a",null,r.a.createElement(yt.a,null)))}}))),r.a.createElement(re.a,{title:"\u65b0\u589e\u9636\u6bb5",width:480,visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel,okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88"},r.a.createElement(w.a,{ref:function(t){return e.form=t}},r.a.createElement(w.a.Item,{name:"rangeDate",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u9636\u6bb5\u65f6\u95f4\uff01"}]},r.a.createElement(Ct,{disabledDate:function(e){return!e.isBetween(l,n,"day","[]")},defaultPickerValue:[Fe()(l)],style:{width:"100%"}})))))}}]),a}(n.Component),It={createSprint:function(e){return function(){var t=Object(A.a)(L.a.mark((function t(a){var n,r;return L.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,H("/sprints/create",{startDate:(c=e).startDate,endDate:c.endDate},"POST");case 2:n=t.sent,0===(r=n.data).code&&a(kt(r.data));case 5:case"end":return t.stop()}var c}),t)})));return function(e){return t.apply(this,arguments)}}()},getSprints:function(){return function(){var e=Object(A.a)(L.a.mark((function e(t){var a,n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H("/sprints/list");case 2:a=e.sent,0===(n=a.data).code&&t({type:"RECEIVE_SPRINTS",data:n.data});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},Dt=Object(l.b)((function(e){return{project:e.project,sprints:e.sprints}}),It)(St),_t=a(433),Tt=function(){return r.a.createElement(_t.a,{status:"404",title:"404",style:{background:"none"},subTitle:"\u9875\u9762\u4e0d\u5b58\u5728"})},Nt=ne.a.Content,Rt=function(e){Object(x.a)(a,e);var t=Object(C.a)(a);function a(){var e;Object(k.a)(this,a);for(var n=arguments.length,c=new Array(n),o=0;o<n;o++)c[o]=arguments[o];return(e=t.call.apply(t,[this].concat(c))).state={collapsed:!1},e.navList=[{path:"/",component:Be,exact:!0},{path:"/project/profile",component:Ge},{path:"/project/member",component:dt},{path:"/project/meeting",component:qe},{path:"/project/story",component:jt},{path:"/project/board",component:ct},{path:"/project/sprint",component:Dt},{component:Tt}],e.toggle=function(){e.setState({collapsed:!e.state.collapsed})},e.logout=function(){var t=Object(ae.a)(e);re.a.confirm({title:"\u786e\u8ba4\u9000\u51fa\u767b\u5f55\u5417\uff1f",icon:r.a.createElement(ce.a,null),cancelText:"\u53d6\u6d88",okText:"\u786e\u5b9a",onOk:function(){F.a.remove("projectId"),F.a.remove("userId"),t.props.resetUser(),t.props.resetProject()}})},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){F.a.get("userId")&&!this.props.user._id&&this.props.getUser(),F.a.get("projectId")&&!this.props.project._id&&this.props.getProject()}},{key:"render",value:function(){var e=F.a.get("userId"),t=F.a.get("projectId"),a=!("/"===this.props.location.pathname&&!t);return e?a&&!t?r.a.createElement(s.a,{to:"/"}):r.a.createElement(ne.a,{style:{position:"fixed",top:0,left:0,right:0,bottom:0}},r.a.createElement(be,{visiable:a,collapsed:this.state.collapsed}),r.a.createElement(ne.a,{style:{minHeight:"100vh"}},r.a.createElement(xe,{visiable:a,projectName:this.props.project.projectName,username:this.props.user.username,collapsed:this.state.collapsed,toggle:a?this.toggle:null,logout:this.logout}),r.a.createElement(Nt,{style:{padding:"24px",minHeight:"auto"}},r.a.createElement(s.d,null,this.navList.map((function(e,t){return r.a.createElement(s.b,Object.assign({key:t},e))})))))):r.a.createElement(s.a,{to:"/login"})}}]),a}(n.Component),Ft={resetUser:Q,resetProject:Le,getProject:function(){return function(){var e=Object(A.a)(L.a.mark((function e(t){var a,n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H("/projects/project");case 2:a=e.sent,0===(n=a.data).code?t(Ye(n.data)):t(Le(n.msg));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},getUser:function(){return function(){var e=Object(A.a)(L.a.mark((function e(t){var a,n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,H("/users/user");case 2:a=e.sent,0===(n=a.data).code?t({type:"RECEIVE_USER",data:n.data}):t(Q(n.msg));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},Pt=Object(l.b)((function(e){return{user:e.user,project:e.project}}),Ft)(Rt);a(419),a(420);o.a.render(r.a.createElement(u.a,{locale:m.a},r.a.createElement(l.a,{store:y},r.a.createElement(i.a,null,r.a.createElement(s.d,null,r.a.createElement(s.b,{path:"/login",component:$}),r.a.createElement(s.b,{path:"/register",component:te}),r.a.createElement(s.b,{component:Pt}))))),document.getElementById("root"))},96:function(e,t,a){e.exports={container:"_2RVmFXkm3NpCTVXrhpAky_",content:"_2Htpzx3R8oKPu3PkWf4WoK",main:"_1f5ImrUK28jULxBPy6Vr4Z"}}},[[247,1,2]]]);
//# sourceMappingURL=main.debb67ca.chunk.js.map