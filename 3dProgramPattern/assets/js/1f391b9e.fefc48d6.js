"use strict";(self.webpackChunk_3dprgrampattern_website=self.webpackChunk_3dprgrampattern_website||[]).push([[85],{6416:(e,a,t)=>{t.r(a),t.d(a,{default:()=>d});var n=t(7294),l=t(6010),s=t(7019),i=t(3905),c=t(7707),m=t(1575),r=t(3810);const o="mdxPageWrapper_eQvw";const d=function(e){const{content:a}=e,{frontMatter:t,metadata:d}=a,{title:v,description:g,wrapperClassName:_,hide_table_of_contents:N}=t,{permalink:p}=d;return n.createElement(s.Z,{title:v,description:g,permalink:p,wrapperClassName:_??r.kM.wrapper.mdxPages,pageClassName:r.kM.page.mdxPage},n.createElement("main",{className:"container container--fluid margin-vert--lg"},n.createElement("div",{className:(0,l.Z)("row",o)},n.createElement("div",{className:(0,l.Z)("col",!N&&"col--8")},n.createElement(i.Zo,{components:c.Z},n.createElement(a,null))),!N&&a.toc&&n.createElement("div",{className:"col col--2"},n.createElement(m.Z,{toc:a.toc,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level})))))}},1575:(e,a,t)=>{t.d(a,{Z:()=>m});var n=t(7462),l=t(7294),s=t(6010),i=t(5002);const c="tableOfContents_vrFS";const m=function(e){let{className:a,...t}=e;return l.createElement("div",{className:(0,s.Z)(c,"thin-scrollbar",a)},l.createElement(i.Z,(0,n.Z)({},t,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:(e,a,t)=>{t.d(a,{Z:()=>c});var n=t(7462),l=t(7294),s=t(3810);function i(e){let{toc:a,className:t,linkClassName:n,isChild:s}=e;return a.length?l.createElement("ul",{className:s?void 0:t},a.map((e=>l.createElement("li",{key:e.id},l.createElement("a",{href:`#${e.id}`,className:n??void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(i,{isChild:!0,toc:e.children,className:t,linkClassName:n}))))):null}function c(e){let{toc:a,className:t="table-of-contents table-of-contents__left-border",linkClassName:c="table-of-contents__link",linkActiveClassName:m,minHeadingLevel:r,maxHeadingLevel:o,...d}=e;const v=(0,s.LU)(),g=r??v.tableOfContents.minHeadingLevel,_=o??v.tableOfContents.maxHeadingLevel,N=(0,s.DA)({toc:a,minHeadingLevel:g,maxHeadingLevel:_}),p=(0,l.useMemo)((()=>{if(c&&m)return{linkClassName:c,linkActiveClassName:m,minHeadingLevel:g,maxHeadingLevel:_}}),[c,m,g,_]);return(0,s.Si)(p),l.createElement(i,(0,n.Z)({toc:N,className:t,linkClassName:c},d))}}}]);