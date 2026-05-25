"use client";

import React, { useState, useRef } from "react";

/* ── GLOBAL STYLES ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  :root{
    --ink:#12150f;--ink-2:#2a2e24;--ink-3:#4a5040;--ink-4:#7a8470;--ink-5:#aab4a0;
    --paper:#f7f5f0;--paper-2:#eeebe3;--paper-3:#e4e0d6;
    --moss:#2d5a3d;--moss-2:#3d7a52;--moss-3:#5a9e6e;--moss-4:#8cc4a0;--moss-5:#c4e0d0;--moss-6:#e8f4ee;
    --terra:#8b4513;--terra-2:#a05a2c;--terra-light:#f5e8dc;
    --gold:#c8960c;--gold-light:#fdf3d8;
    --red:#b03030;--red-light:#fdf0f0;
    --blue:#1a4a7a;--blue-light:#e8f0fa;
    --sw:252px;--hh:58px;
    --fd:'Playfair Display',Georgia,serif;
    --fb:'Plus Jakarta Sans',system-ui,sans-serif;
    --s1:0 1px 3px rgba(18,21,15,.06),0 1px 2px rgba(18,21,15,.04);
    --s2:0 4px 16px rgba(18,21,15,.08),0 2px 6px rgba(18,21,15,.04);
    --s4:0 20px 60px rgba(18,21,15,.16),0 8px 24px rgba(18,21,15,.08);
  }
  html,body{height:100%}
  body{font-family:var(--fb);background:var(--paper);color:var(--ink);font-size:14px;line-height:1.5}
  .shell{display:flex;height:100vh;overflow:hidden}
  .sb{width:var(--sw);background:var(--ink);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto}
  .sb::-webkit-scrollbar{width:3px}
  .sb::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1)}
  .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
  .topbar{height:var(--hh);background:rgba(247,245,240,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--paper-3);display:flex;align-items:center;padding:0 28px;gap:12px;flex-shrink:0}
  .content{flex:1;overflow-y:auto;padding:28px}
  .content::-webkit-scrollbar{width:4px}
  .content::-webkit-scrollbar-thumb{background:var(--paper-3);border-radius:4px}
  .sb-brand{padding:22px 20px 18px;border-bottom:1px solid rgba(255,255,255,.08)}
  .sb-logo{font-family:var(--fd);font-size:23px;color:#fff;letter-spacing:-.01em;line-height:1}
  .sb-logo em{font-style:italic;color:var(--moss-4)}
  .sb-tag{font-size:9px;color:rgba(255,255,255,.3);letter-spacing:.14em;text-transform:uppercase;margin-top:3px}
  .sb-sec{padding:14px 12px 0}
  .sb-sec-lbl{font-size:9px;color:rgba(255,255,255,.22);letter-spacing:.14em;text-transform:uppercase;padding:0 8px 7px;font-weight:600}
  .sb-item{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:8px;cursor:pointer;color:rgba(255,255,255,.55);font-size:12.5px;font-weight:400;transition:all .16s;margin-bottom:1px;border:none;background:none;width:100%;text-align:left;position:relative}
  .sb-item:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.88)}
  .sb-item.active{background:linear-gradient(135deg,rgba(45,90,61,.85),rgba(45,90,61,.45));color:#fff;font-weight:500}
  .sb-item.active::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:58%;background:var(--moss-4);border-radius:0 3px 3px 0}
  .sb-bdg{margin-left:auto;font-size:10px;padding:1px 6px;border-radius:20px;font-weight:700;min-width:18px;text-align:center}
  .sb-bdg.cnt{background:rgba(140,196,160,.2);color:var(--moss-4)}
  .sb-bdg.alrt{background:rgba(176,48,48,.28);color:#f08080;animation:pulseBadge 2s ease-in-out infinite}
  @keyframes pulseBadge{0%,100%{opacity:1}50%{opacity:.55}}
  .sb-footer{margin-top:auto;padding:14px 12px;border-top:1px solid rgba(255,255,255,.07)}
  .sb-user{display:flex;align-items:center;gap:9px;padding:7px;border-radius:8px;cursor:pointer}
  .sb-user:hover{background:rgba(255,255,255,.06)}
  .sb-uname{font-size:12px;color:rgba(255,255,255,.8);font-weight:500}
  .sb-urole{font-size:10px;color:rgba(255,255,255,.32)}
  .tb-bc{font-size:10.5px;color:var(--ink-4);letter-spacing:.05em}
  .tb-title{font-family:var(--fd);font-size:17px;color:var(--ink);font-weight:500}
  .tb-actions{margin-left:auto;display:flex;gap:7px;align-items:center}
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:1.5px solid;transition:all .15s;font-family:var(--fb);white-space:nowrap}
  .btn:disabled{opacity:.42;cursor:not-allowed}
  .btn-p{background:var(--moss);color:#fff;border-color:var(--moss)}
  .btn-p:hover:not(:disabled){background:var(--moss-2);border-color:var(--moss-2)}
  .btn-s{background:#fff;color:var(--ink-2);border-color:var(--paper-3)}
  .btn-s:hover{background:var(--paper)}
  .btn-g{background:transparent;color:var(--ink-3);border-color:transparent;padding:7px 10px}
  .btn-g:hover{background:var(--paper-2)}
  .btn-gold{background:var(--gold);color:#fff;border-color:var(--gold)}
  .btn-sm{padding:5px 11px;font-size:12px;gap:4px}
  .btn-xs{padding:3px 8px;font-size:11px;gap:3px}
  .btn-ico{padding:7px;aspect-ratio:1}
  .card{background:#fff;border-radius:16px;border:1px solid var(--paper-3);box-shadow:var(--s1)}
  .cp{padding:22px}
  .cp-sm{padding:14px 16px}
  .chd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
  .ct{font-size:13.5px;font-weight:600;color:var(--ink-2)}
  .cs{font-size:11.5px;color:var(--ink-4);margin-top:2px}
  .metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:11px;margin-bottom:22px}
  .metric{background:#fff;border-radius:12px;border:1px solid var(--paper-3);padding:15px 17px;box-shadow:var(--s1);transition:box-shadow .18s}
  .metric:hover{box-shadow:var(--s2)}
  .mlbl{font-size:10px;font-weight:600;color:var(--ink-4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:7px}
  .mval{font-family:var(--fd);font-size:24px;font-weight:500;color:var(--ink);line-height:1;margin-bottom:4px}
  .mdelta{font-size:11px;color:var(--ink-4)}
  .dup{color:var(--moss-2);font-weight:600}
  .ddn{color:var(--red);font-weight:600}
  .badge{display:inline-flex;align-items:center;padding:3px 8px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.02em;white-space:nowrap}
  .bm{background:var(--moss-6);color:var(--moss)}
  .bt{background:var(--terra-light);color:var(--terra)}
  .bg{background:var(--gold-light);color:var(--gold)}
  .br{background:var(--red-light);color:var(--red)}
  .bb{background:var(--blue-light);color:var(--blue)}
  .bgy{background:var(--paper-2);color:var(--ink-3)}
  .fg{margin-bottom:14px}
  .fg-row{display:grid;grid-template-columns:1fr 1fr;gap:11px}
  .fl{display:block;font-size:10.5px;font-weight:600;color:var(--ink-3);margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase}
  .fi{width:100%;padding:9px 12px;border:1.5px solid var(--paper-3);border-radius:8px;font-size:13px;font-family:var(--fb);color:var(--ink);background:#fff;outline:none;transition:border-color .14s}
  .fi:focus{border-color:var(--moss-3);box-shadow:0 0 0 3px rgba(45,90,61,.1)}
  .fi::placeholder{color:var(--ink-5)}
  .fi-sel{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a8470' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:30px;cursor:pointer}
  .fi-ta{resize:vertical;min-height:88px;line-height:1.6}
  .fi-sm{padding:6px 10px;font-size:12px}
  .tbl{width:100%;border-collapse:collapse}
  .tbl th{font-size:10px;font-weight:700;color:var(--ink-4);text-transform:uppercase;letter-spacing:.08em;padding:9px 13px;text-align:left;border-bottom:1px solid var(--paper-3)}
  .tbl td{padding:11px 13px;border-bottom:1px solid var(--paper-2);font-size:13px;vertical-align:middle}
  .tbl tr:last-child td{border-bottom:none}
  .tbl tbody tr{cursor:pointer;transition:background .1s}
  .tbl tbody tr:hover td{background:var(--moss-6)}
  .alert{display:flex;gap:9px;padding:11px 15px;border-radius:12px;font-size:13px;margin-bottom:12px;align-items:flex-start;line-height:1.5}
  .aw{background:var(--gold-light);color:#7a5800;border:1px solid rgba(200,150,12,.2)}
  .ad{background:var(--red-light);color:var(--red);border:1px solid rgba(176,48,48,.2)}
  .as{background:var(--moss-6);color:var(--moss);border:1px solid rgba(45,90,61,.2)}
  .ai-p{background:linear-gradient(135deg,var(--moss-6),#f0f9f4);border:1px solid var(--moss-5);border-radius:16px;padding:17px;margin-bottom:20px}
  .ai-hd{display:flex;align-items:center;gap:8px;margin-bottom:10px}
  .ai-pulse{width:7px;height:7px;border-radius:50%;background:var(--moss-3);animation:aiPulse 2s ease-in-out infinite;flex-shrink:0}
  @keyframes aiPulse{0%,100%{box-shadow:0 0 0 0 rgba(45,90,61,.4)}50%{box-shadow:0 0 0 6px rgba(45,90,61,0)}}
  .ai-lbl{font-size:10px;font-weight:700;color:var(--moss);text-transform:uppercase;letter-spacing:.1em}
  .ai-txt{font-size:13px;color:var(--ink-2);line-height:1.7}
  .ai-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
  .ai-chip{background:#fff;border:1.5px solid var(--moss-5);color:var(--moss-2);font-size:12px;padding:4px 12px;border-radius:20px;cursor:pointer;transition:all .14s;font-weight:500;font-family:var(--fb);border-style:solid}
  .ai-chip:hover{background:var(--moss-6)}
  .kanban{display:flex;gap:12px;overflow-x:auto;padding-bottom:10px;min-height:380px}
  .kanban::-webkit-scrollbar{height:4px}
  .kanban::-webkit-scrollbar-thumb{background:var(--paper-3);border-radius:4px}
  .kol{background:var(--paper-2);border-radius:12px;padding:12px;flex:0 0 205px;display:flex;flex-direction:column;transition:background-color .2s}
  .kol.drag-over{background:var(--moss-6);border:2px dashed var(--moss-4)}
  .kcard{background:#fff;border-radius:8px;border:1px solid var(--paper-3);padding:12px;margin-bottom:7px;cursor:pointer;transition:all .16s;box-shadow:var(--s1)}
  .kcard:hover{border-color:var(--moss-5);box-shadow:var(--s2);transform:translateY(-1px)}
  .kcard.dragging{opacity:.5;transform:scale(.95)}
  .kcard[draggable=true]{cursor:grab}
  .kcard[draggable=true]:active{cursor:grabbing}
  .kc-nm{font-size:12.5px;font-weight:600;color:var(--ink);margin-bottom:3px;line-height:1.3}
  .kc-cl{font-size:11px;color:var(--ink-4);margin-bottom:7px}
  .progress{height:5px;border-radius:3px;background:var(--paper-3);overflow:hidden}
  .prog-fill{height:100%;border-radius:3px;transition:width .4s ease;background:linear-gradient(90deg,var(--moss-3),var(--moss-4))}
  .steps{display:flex;align-items:center;gap:0;margin-bottom:24px}
  .step-nd{display:flex;align-items:center;gap:8px;cursor:pointer}
  .step-c{width:27px;height:27px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;transition:all .2s}
  .step-c.done{background:var(--moss);color:#fff}
  .step-c.active{background:var(--moss-2);color:#fff;box-shadow:0 0 0 4px rgba(45,90,61,.15)}
  .step-c.idle{background:var(--paper-3);color:var(--ink-4)}
  .step-lbl{font-size:12px;font-weight:500;color:var(--ink-4);white-space:nowrap}
  .step-lbl.active{color:var(--moss);font-weight:600}
  .step-con{flex:1;height:1px;background:var(--paper-3);min-width:14px;margin:0 4px}
  .step-con.done{background:var(--moss-4)}
  .tl{position:relative;padding-left:20px}
  .tl::before{content:'';position:absolute;left:7px;top:8px;bottom:4px;width:1px;background:var(--paper-3)}
  .tl-item{position:relative;margin-bottom:16px}
  .tl-dot{position:absolute;left:-15px;top:4px;width:9px;height:9px;border-radius:50%;background:var(--moss-4);border:2px solid #fff;box-shadow:0 0 0 1px var(--moss-5)}
  .tl-d{font-size:10px;color:var(--ink-4);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}
  .tl-t{font-size:13px;color:var(--ink-2)}
  .tl-s{font-size:11px;color:var(--ink-4);margin-top:1px}
  .prop-preview{background:#fff;border-radius:24px;overflow:hidden;box-shadow:var(--s4);border:1px solid var(--paper-3)}
  .prop-cover{padding:38px;position:relative;overflow:hidden;background:linear-gradient(155deg,#12150f 0%,#2a2e24 48%,#2d5a3d 100%)}
  .prop-cover::before{content:'';position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:rgba(140,196,160,.08)}
  .prop-cover-lbl{font-size:9.5px;color:rgba(255,255,255,.38);letter-spacing:.16em;text-transform:uppercase;margin-bottom:10px;font-weight:600;position:relative;z-index:1}
  .prop-cover-title{font-family:var(--fd);font-size:30px;color:#fff;line-height:1.15;margin-bottom:5px;position:relative;z-index:1;font-style:italic}
  .prop-cover-sub{font-size:13px;color:rgba(255,255,255,.55);position:relative;z-index:1}
  .prop-body{padding:30px}
  .prop-sec{margin-bottom:26px;padding-bottom:26px;border-bottom:1px solid var(--paper-2)}
  .prop-sec:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .prop-sec-title{font-family:var(--fd);font-size:18px;color:var(--moss);margin-bottom:12px;font-weight:500}
  .prop-p{font-size:13px;color:var(--ink-2);line-height:1.78}
  .img-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
  .img-tile{border-radius:12px;overflow:hidden;position:relative;background:var(--paper-2)}
  .img-tile img{width:100%;height:100%;object-fit:cover;display:block}
  .img-tile-lbl{position:absolute;bottom:0;left:0;right:0;padding:6px 10px;background:linear-gradient(transparent,rgba(18,21,15,.6));color:#fff;font-size:10.5px;font-weight:500}
  .bar-chart{display:flex;align-items:flex-end;gap:7px;height:100px;padding:0 4px}
  .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px}
  .bar-fill{width:100%;border-radius:4px 4px 0 0;min-height:4px;transition:height .4s ease}
  .bar-lbl{font-size:9.5px;color:var(--ink-4);font-weight:500}
  .bar-val{font-size:10px;font-weight:700;color:var(--ink-3)}
  .tabs{display:flex;gap:0;margin-bottom:20px;border-bottom:1.5px solid var(--paper-3)}
  .tab-btn{padding:9px 17px;font-size:13px;font-weight:500;color:var(--ink-4);cursor:pointer;border:none;background:none;border-bottom:2.5px solid transparent;margin-bottom:-1.5px;transition:all .14s;font-family:var(--fb)}
  .tab-btn.active{color:var(--moss);border-bottom-color:var(--moss);font-weight:600}
  .tab-btn:hover:not(.active){color:var(--ink-2)}
  .acard{border-left:4px solid;padding:16px 18px;border-radius:0 12px 12px 0;background:#fff;box-shadow:var(--s1);margin-bottom:12px;transition:box-shadow .18s}
  .acard:hover{box-shadow:var(--s2)}
  .ac-warn{border-color:var(--gold)}
  .ac-danger{border-color:var(--red)}
  .ac-ok{border-color:var(--moss-3)}
  .upload-zone{border:2px dashed var(--paper-3);border-radius:12px;padding:22px;text-align:center;cursor:pointer;transition:all .18s;background:var(--paper)}
  .upload-zone:hover{border-color:var(--moss-4);background:var(--moss-6)}
  .flex{display:flex;align-items:center}
  .flex-b{display:flex;justify-content:space-between;align-items:center}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:11px}
  .mt8{margin-top:8px}.mt12{margin-top:12px}.mt16{margin-top:16px}.mt20{margin-top:20px}
  .mb4{margin-bottom:4px}.mb6{margin-bottom:6px}.mb8{margin-bottom:8px}.mb12{margin-bottom:12px}.mb16{margin-bottom:16px}.mb20{margin-bottom:20px}
  .tsm{font-size:12px}.txs{font-size:11px}.tmuted{color:var(--ink-4)}.tdanger{color:var(--red)}.tmoss{color:var(--moss)}
  .fw5{font-weight:500}.fw6{font-weight:600}.fw7{font-weight:700}
  .trunc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .divider{height:1px;background:var(--paper-2);margin:16px 0}
  .chip{display:inline-flex;background:var(--moss-6);border:1px solid var(--moss-5);color:var(--moss-2);font-size:11px;padding:3px 10px;border-radius:20px;font-weight:500}
  .chip-t{background:var(--terra-light);border-color:rgba(139,69,19,.2);color:var(--terra-2)}
  .scroll-x{overflow-x:auto;padding-bottom:6px}
  .empty-st{text-align:center;padding:44px 24px;color:var(--ink-4)}
  .fd{font-family:var(--fd)}
  .mk{color:var(--moss-2);font-weight:600}
  .mw{color:var(--gold);font-weight:600}
  .mb-c{color:var(--red);font-weight:600}
  .notif{position:absolute;top:5px;right:5px;width:6px;height:6px;border-radius:50%;background:var(--red);border:2px solid var(--paper)}
  @keyframes spin{to{transform:rotate(360deg)}}
  .spinner{width:15px;height:15px;border:2px solid rgba(45,90,61,.2);border-top-color:var(--moss);border-radius:50%;animation:spin .65s linear infinite;flex-shrink:0}
  .modal-ov{position:fixed;inset:0;background:rgba(18,21,15,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
  .modal-bx{background:#fff;border-radius:24px;padding:26px;width:100%;max-width:540px;max-height:88vh;overflow-y:auto;box-shadow:var(--s4)}
  .pb12{padding-bottom:12px}
`;

/* ── DATA ── */
const STAGES = ['Qualificacao','Briefing','Proposta','Negociacao','Ganho','Perdido'];
const STAGE_LABELS: Record<string,string> = {Qualificacao:'Qualificação',Briefing:'Briefing',Proposta:'Proposta',Negociacao:'Negociação',Ganho:'Ganho',Perdido:'Perdido'};

interface Opp { id:string;name:string;client:string;type:string;stage:string;value:number;margin:number;date:string;priority:string;products:string[] }
interface Client { id:string;name:string;type:string;email:string;phone:string;projects:number;totalValue:number;ltv:string;status:string }
interface Product { id:string;name:string;cat:string;unit:string;basePrice:number;minMargin:number }
interface Approval { id:string;name:string;value:number;margin:number;discount:number;finalMargin:number;status:string;by:string;date:string;reason:string }
interface Partner { id:string;arch:string;project:string;status:string;date:string;value:number;stage:string;priority:string }

const OPPS: Opp[] = [
  {id:'OPP-001',name:'Villa Morumbi — Jardim Ext.',client:'Arq. Beatriz Fonseca',type:'Projeto',stage:'Proposta',value:87500,margin:38,date:'02/06',priority:'Alta',products:['Jardim Vertical Premium','Projeto Executivo','Irrigacao']},
  {id:'OPP-002',name:'Higienopolis Interiors',client:'Familia Rodrigues',type:'Catalogo',stage:'Negociacao',value:24300,margin:52,date:'08/06',priority:'Media',products:['Vasos Premium','Plantas Indoor','Curadoria Botanica']},
  {id:'OPP-003',name:'Hotel Fasano Gardens',client:'Fasano Group S.A.',type:'Projeto',stage:'Briefing',value:310000,margin:41,date:'15/06',priority:'Alta',products:['Paisagismo Completo','Manutencao 12m','Projeto Executivo']},
  {id:'OPP-004',name:'Faria Lima Biofilia',client:'BREX Investimentos',type:'Projeto',stage:'Ganho',value:68000,margin:45,date:'20/05',priority:'Media',products:['Jardim Vertical','Curadoria','Manutencao']},
  {id:'OPP-005',name:'Itaim — Varanda',client:'Dr. Marcos Levi',type:'Catalogo',stage:'Proposta',value:15800,margin:61,date:'10/06',priority:'Baixa',products:['Plantas Tropicais','Vasos Concreto','Trelicas']},
  {id:'OPP-006',name:'Condominio Verde',client:'Construtora Nortao',type:'Projeto',stage:'Qualificacao',value:145000,margin:29,date:'18/06',priority:'Alta',products:['Paisagismo','Irrigacao','Projeto']},
  {id:'OPP-007',name:'Clinica Integrada SP',client:'Arq. Camila Torres',type:'Projeto',stage:'Negociacao',value:52000,margin:44,date:'12/06',priority:'Media',products:['Jardim Interno','Plantas Filtradoras','Curadoria']},
];

const CLIENTS: Client[] = [
  {id:'C-001',name:'Arq. Beatriz Fonseca',type:'Arquiteta Parceira',email:'b.fonseca@bfstudio.com.br',phone:'(11) 99234-5678',projects:4,totalValue:280000,ltv:'Alto',status:'Ativo'},
  {id:'C-002',name:'Familia Rodrigues',type:'Cliente Final',email:'paulo.rodrigues@gmail.com',phone:'(11) 98765-4321',projects:2,totalValue:42300,ltv:'Medio',status:'Ativo'},
  {id:'C-003',name:'Fasano Group S.A.',type:'Corporativo',email:'operations@fasano.com.br',phone:'(11) 3262-4000',projects:3,totalValue:620000,ltv:'Alto',status:'Ativo'},
  {id:'C-004',name:'BREX Investimentos',type:'Corporativo',email:'facilities@brex.com.br',phone:'(11) 4040-5050',projects:1,totalValue:68000,ltv:'Medio',status:'Inativo'},
  {id:'C-005',name:'Arq. Camila Torres',type:'Arquiteta Parceira',email:'camila@ctarquitetos.com.br',phone:'(11) 96543-2100',projects:2,totalValue:90500,ltv:'Alto',status:'Ativo'},
  {id:'C-006',name:'Arq. Ricardo Motta',type:'Arquiteto Parceiro',email:'r.motta@rmstudio.com.br',phone:'(11) 98000-1122',projects:1,totalValue:34000,ltv:'Medio',status:'Ativo'},
];

const PRODUCTS: Product[] = [
  {id:'P-001',name:'Jardim Vertical Standard',cat:'Paisagismo',unit:'m2',basePrice:850,minMargin:35},
  {id:'P-002',name:'Jardim Vertical Premium',cat:'Paisagismo',unit:'m2',basePrice:1400,minMargin:40},
  {id:'P-003',name:'Vaso Concreto P (30cm)',cat:'Vasos',unit:'un',basePrice:290,minMargin:55},
  {id:'P-004',name:'Vaso Ceramica M (45cm)',cat:'Vasos',unit:'un',basePrice:420,minMargin:55},
  {id:'P-005',name:'Vaso Fibra G (60cm)',cat:'Vasos',unit:'un',basePrice:680,minMargin:52},
  {id:'P-006',name:'Ficus Lyrata (grande)',cat:'Plantas',unit:'un',basePrice:380,minMargin:40},
  {id:'P-007',name:'Pachira Aquatica G',cat:'Plantas',unit:'un',basePrice:520,minMargin:38},
  {id:'P-008',name:'Monstera Deliciosa P',cat:'Plantas',unit:'un',basePrice:180,minMargin:45},
  {id:'P-009',name:'Curadoria Botanica',cat:'Servico',unit:'proj',basePrice:2500,minMargin:65},
  {id:'P-010',name:'Projeto Executivo',cat:'Servico',unit:'proj',basePrice:8500,minMargin:60},
  {id:'P-011',name:'Sistema de Irrigacao',cat:'Irrigacao',unit:'ponto',basePrice:320,minMargin:45},
  {id:'P-012',name:'Manutencao Mensal',cat:'Servico',unit:'mes',basePrice:1200,minMargin:58},
];

const APPROVALS: Approval[] = [
  {id:'APR-001',name:'Higienopolis Interiors',value:24300,margin:52,discount:8,finalMargin:44,status:'pending',by:'Carlos Andrade',date:'08/06',reason:'Desconto fidelidade — 3 projetos'},
  {id:'APR-002',name:'Condominio Verde',value:145000,margin:29,discount:5,finalMargin:24,status:'pending',by:'Ana Lima',date:'09/06',reason:'Volume alto — parceria estrategica'},
  {id:'APR-003',name:'Villa Morumbi',value:87500,margin:38,discount:0,finalMargin:38,status:'auto',by:'Sistema',date:'07/06',reason:'Margem dentro da politica'},
];

const PARTNERS: Partner[] = [
  {id:'PR-001',arch:'Arq. Beatriz Fonseca',project:'Res. Jardins — Gourmet',status:'Em andamento',date:'01/06',value:54000,stage:'Orcamento',priority:'Alta'},
  {id:'PR-002',arch:'Arq. Ricardo Motta',project:'Corporate HQ — Biofilia',status:'Aguardando docs',date:'05/06',value:0,stage:'Briefing',priority:'Media'},
  {id:'PR-003',arch:'Arq. Camila Torres',project:'Clinica — Jardim Int.',status:'Proposta enviada',date:'28/05',value:38500,stage:'Proposta',priority:'Alta'},
];

const IMG = {
  jardim:['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=75','https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=75','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75'],
  parede:['https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=75','https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&q=75','https://images.unsplash.com/photo-1487530811015-780dbc7193a1?w=600&q=75'],
  ambiente:['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=75','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=75','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=75'],
};

const monthlyData = [{m:'Jan',v:168},{m:'Fev',v:210},{m:'Mar',v:195},{m:'Abr',v:295},{m:'Mai',v:260},{m:'Jun',v:330}];
const maxV = Math.max(...monthlyData.map(d => d.v));

/* ── ICONS ── */
const ICONS: Record<string,string> = {
  dashboard:"M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  briefing:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
  pipeline:"M18 20V10 M12 20V4 M6 20v-6",
  proposal:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8",
  crm:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  arch:"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  approval:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  ops:"M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z",
  plus:"M12 5v14 M5 12h14",
  x:"M18 6L6 18 M6 6l12 12",
  check:"M20 6L9 17l-5-5",
  alert:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z M12 9v4 M12 17h.01",
  search:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  send:"M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7z",
  download:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M15 12a3 3 0 11-6 0 3 3 0 016 0",
  edit:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  arrow:"M5 12h14 M12 5l7 7-7 7",
  bell:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  layers:"M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
};

function Ico({n, s=15, style={}, ...p}: {n:string;s?:number;style?:React.CSSProperties;[key:string]:unknown}) {
  const d = ICONS[n] || '';
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,...style}} {...(p as React.SVGProps<SVGSVGElement>)}>
      {d.split(' M').map((seg, i) => <path key={i} d={i===0 ? seg : 'M'+seg}/>)}
    </svg>
  );
}

/* ── SHARED COMPONENTS ── */
function MBadge({m}: {m:number}) {
  const c = m>=40 ? 'bm' : m>=32 ? 'bg' : 'br';
  return <span className={`badge ${c}`}>{m}%</span>;
}
function SBadge({s}: {s:string}) {
  const map: Record<string,string> = {Qualificacao:'bgy',Briefing:'bb',Proposta:'bt',Negociacao:'bg',Ganho:'bm',Perdido:'br'};
  return <span className={`badge ${map[s]||'bgy'}`}>{STAGE_LABELS[s]||s}</span>;
}
function PBadge({p}: {p:string}) {
  return <span className={`badge ${p==='Alta'?'br':p==='Media'?'bg':'bgy'}`}>{p}</span>;
}
function Avatar({name, size=32}: {name:string;size?:number}) {
  const initials = name.split(' ').filter(Boolean).slice(0,2).map((w:string)=>w[0]).join('').toUpperCase();
  const colors = ['#2d5a3d','#3d7a52','#8b4513','#1a4a7a','#5a3d5a','#3d5a7a'];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return <div style={{width:size,height:size,borderRadius:'50%',background:bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*.36,fontWeight:700,color:'#fff',flexShrink:0}}>{initials}</div>;
}
function Modal({open, onClose, title, sub, children, maxW=540}: {open:boolean;onClose:()=>void;title:string;sub?:string;children:React.ReactNode;maxW?:number}) {
  if (!open) return null;
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-bx" style={{maxWidth:maxW}} onClick={(e:React.MouseEvent)=>e.stopPropagation()}>
        <div className="flex-b mb16">
          <div><div className="fd" style={{fontSize:19,color:'var(--ink)',fontWeight:500}}>{title}</div>{sub&&<div className="tsm tmuted mt8">{sub}</div>}</div>
          <button className="btn btn-g btn-ico" onClick={onClose}><Ico n="x" s={14}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── DASHBOARD ── */
function Dashboard({go}: {go:(p:string)=>void}) {
  const pipe = OPPS.filter(o => !['Ganho','Perdido'].includes(o.stage));
  const totalPipe = pipe.reduce((a,o) => a+o.value, 0);
  const ganho = OPPS.filter(o => o.stage==='Ganho').reduce((a,o) => a+o.value, 0);
  const validOpps = OPPS.filter(o => o.stage !== 'Perdido');
  const avgM = Math.round(validOpps.reduce((a,o) => a+o.margin, 0) / validOpps.length);
  const pendAppr = APPROVALS.filter(a => a.status==='pending').length;
  return (
    <div>
      <div className="ai-p">
        <div className="ai-hd"><div className="ai-pulse"/><span className="ai-lbl">Copilot — Resumo Executivo</span></div>
        <div className="ai-txt">Pipeline ativo: <strong>R$ {(totalPipe/1000).toFixed(0)}k</strong> em {pipe.length} oportunidades. Há <strong>{pendAppr} aprovações pendentes</strong> que podem travar conversão. Hotel Fasano Gardens (R$ 310k) aguarda briefing completo. Margem média em <strong>{avgM}%</strong> — acima da meta de 38%.</div>
        <div className="ai-chips">
          <button className="ai-chip" onClick={()=>go('approvals')}>Revisar aprovações</button>
          <button className="ai-chip" onClick={()=>go('briefing')}>Iniciar briefing Fasano</button>
          <button className="ai-chip" onClick={()=>go('pipeline')}>Ver pipeline completo</button>
        </div>
      </div>
      <div className="metrics">
        {[
          {l:'Pipeline Ativo',v:`R$ ${(totalPipe/1000).toFixed(0)}k`,d:'+22%',up:true},
          {l:'Receita Fechada',v:`R$ ${(ganho/1000).toFixed(0)}k`,d:'+18%',up:true},
          {l:'Margem Média',v:`${avgM}%`,d:'+5pp',up:true},
          {l:'Tempo / Proposta',v:'2.1 dias',d:'-0.8d',up:true},
          {l:'Conversão',v:'38%',d:'+4pp',up:true},
          {l:'Ticket Médio',v:'R$ 108k',d:'+12%',up:true},
          {l:'Aprovações Pend.',v:`${pendAppr}`,d:'urgente',up:false},
          {l:'Propostas (Jun)',v:'6',d:'+2 vs mai',up:true},
        ].map(m => (
          <div className="metric" key={m.l}>
            <div className="mlbl">{m.l}</div>
            <div className="mval">{m.v}</div>
            <div className="mdelta"><span className={m.up?'dup':'ddn'}>{m.d}</span></div>
          </div>
        ))}
      </div>
      <div className="g2 mt20">
        <div className="card cp">
          <div className="chd"><span className="ct">Receita Mensal (R$ mil)</span><span className="txs tmuted">2025</span></div>
          <div className="bar-chart">
            {monthlyData.map(d => (
              <div className="bar-col" key={d.m}>
                <div className="bar-val">{d.v}</div>
                <div className="bar-fill" style={{background:d.m==='Jun'?'var(--moss)':'var(--moss-5)',height:`${(d.v/maxV)*88}px`}}/>
                <div className="bar-lbl">{d.m}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card cp">
          <div className="chd"><span className="ct">Funil de Conversão</span></div>
          {STAGES.slice(0,4).map((s,i) => {
            const cnt = OPPS.filter(o=>o.stage===s).length;
            const val = OPPS.filter(o=>o.stage===s).reduce((a,o)=>a+o.value,0);
            const pct = [100,78,52,34][i];
            return (
              <div key={s} className="mb12">
                <div className="flex-b mb4"><span className="tsm fw5">{STAGE_LABELS[s]}</span><span className="txs tmuted">{cnt} · {val>0?`R$ ${(val/1000).toFixed(0)}k`:'—'}</span></div>
                <div className="progress"><div className="prog-fill" style={{width:`${pct}%`}}/></div>
              </div>
            );
          })}
          <div className="divider"/>
          <div className="flex" style={{gap:16}}>
            <div><div className="txs tmuted mb4">Ganhos</div><div className="fw6 tmoss">{OPPS.filter(o=>o.stage==='Ganho').length} ops</div></div>
            <div><div className="txs tmuted mb4">Perdidos</div><div className="fw6 tdanger">0 ops</div></div>
          </div>
        </div>
      </div>
      <div className="card cp mt20">
        <div className="chd">
          <div><span className="ct">Oportunidades Recentes</span><div className="cs">Pipeline ativo com alertas em tempo real</div></div>
          <button className="btn btn-s btn-sm" onClick={()=>go('pipeline')}>Ver todas</button>
        </div>
        <div className="scroll-x">
          <table className="tbl">
            <thead><tr><th>Oportunidade</th><th>Cliente</th><th>Estágio</th><th>Valor</th><th>Margem</th><th>Prioridade</th></tr></thead>
            <tbody>
              {OPPS.filter(o=>!['Ganho','Perdido'].includes(o.stage)).slice(0,5).map(o => (
                <tr key={o.id} onClick={()=>go('pipeline')}>
                  <td><div className="fw6 trunc" style={{maxWidth:190}}>{o.name}</div><div className="txs tmuted">{o.id}</div></td>
                  <td className="tsm">{o.client}</td>
                  <td><SBadge s={o.stage}/></td>
                  <td className="fw5">R$ {o.value.toLocaleString('pt-BR')}</td>
                  <td><MBadge m={o.margin}/></td>
                  <td><PBadge p={o.priority}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="g3 mt20">
        <div className="card cp">
          <div className="chd"><span className="ct">Top Parceiros</span></div>
          {CLIENTS.filter(c=>c.type.includes('Arquitet')||c.type.includes('Arquiteto')).map(c => (
            <div key={c.id} className="flex mb12" style={{gap:10}}>
              <Avatar name={c.name} size={30}/>
              <div style={{flex:1,minWidth:0}}>
                <div className="fw5 tsm trunc">{c.name}</div>
                <div className="txs tmuted">{c.projects} proj · R$ {(c.totalValue/1000).toFixed(0)}k</div>
              </div>
              <span className={`badge ${c.ltv==='Alto'?'bm':'bg'}`}>{c.ltv}</span>
            </div>
          ))}
        </div>
        <div className="card cp">
          <div className="chd"><span className="ct">Aprovações Urgentes</span></div>
          {APPROVALS.filter(a=>a.status==='pending').map(a => (
            <div key={a.id} className={`acard ${a.finalMargin<32?'ac-danger':'ac-warn'} mb8`} style={{padding:'10px 13px'}}>
              <div className="fw6 tsm mb4">{a.name}</div>
              <div className="txs tmuted mb6">{a.by} · {a.date}</div>
              <div className="flex-b">
                <span className="txs">Margem: <strong className={a.finalMargin<32?'tdanger':'mw'}>{a.finalMargin}%</strong></span>
                <button className="btn btn-p btn-xs" onClick={()=>go('approvals')}>Revisar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card cp">
          <div className="chd"><span className="ct">Atividade Recente</span></div>
          <div className="tl">
            {[
              {d:'Há 30min',t:'Proposta enviada',s:'Higienopolis — R$ 24k'},
              {d:'Há 2h',t:'Briefing recebido',s:'Hotel Fasano Gardens'},
              {d:'Há 3h',t:'Aprovação pendente',s:'Condominio Verde — 29%'},
              {d:'Ontem',t:'Projeto ganho',s:'Faria Lima — R$ 68k'},
            ].map((it,i) => (
              <div className="tl-item" key={i}>
                <div className="tl-dot"/>
                <div className="tl-d">{it.d}</div>
                <div className="tl-t">{it.t}</div>
                <div className="tl-s">{it.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── BRIEFING ── */
function BriefingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({clientName:'',clientType:'arquiteto',projectName:'',projectType:'residencial',style:'contemporaneo',area:'',budget:'',urgency:'normal',notes:'',environment:''});
  const [items, setItems] = useState<(Product & {qty:number;discount:number})[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiData, setAiData] = useState<Record<string,unknown>|null>(null);
  const [propModal, setPropModal] = useState(false);
  const [catFilter, setCatFilter] = useState('Todos');
  const [attachedFiles, setAttachedFiles] = useState<{name:string;size:number;type:string;id:number}[]>([]);
  const [attachError, setAttachError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    setAttachError('');
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) { setAttachError('Nenhum arquivo selecionado.'); return; }
    const MAX = 20 * 1024 * 1024;
    const valid: {name:string;size:number;type:string;id:number}[] = [];
    const errors: string[] = [];
    files.forEach(f => {
      if (f.size > MAX) errors.push(`${f.name} excede 20MB`);
      else valid.push({name:f.name, size:f.size, type:f.type||'desconhecido', id:Date.now()+Math.random()});
    });
    if (errors.length) setAttachError(errors.join(', '));
    if (valid.length) setAttachedFiles(prev => [...prev, ...valid]);
    e.target.value = '';
  };

  const removeFile = (id: number) => setAttachedFiles(prev => prev.filter(f => f.id !== id));
  const fmtSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024*1024) return (bytes/1024).toFixed(1) + ' KB';
    return (bytes/(1024*1024)).toFixed(1) + ' MB';
  };
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(f => ({...f, [k]:e.target.value}));
  const cats = ['Todos', ...new Set(PRODUCTS.map(p=>p.cat))];
  const visProds = catFilter==='Todos' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===catFilter);
  const addItem = (p: Product) => { if (!items.find(i=>i.id===p.id)) setItems(prev=>[...prev,{...p,qty:1,discount:0}]); };
  const remItem = (id: string) => setItems(prev => prev.filter(i=>i.id!==id));
  const updItem = (id: string, k: string, v: string) => setItems(prev => prev.map(i => i.id===id ? {...i,[k]:+v} : i));
  const total = items.reduce((a,i) => a + i.basePrice*i.qty*(1-i.discount/100), 0);
  const avgMargin = items.length ? Math.round(items.reduce((a,i) => a+(i.minMargin*(1-i.discount/100/2)),0)/items.length) : 0;

  const runAI = async () => {
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setAiData({
      summary:`Projeto ${form.projectType} estilo ${form.style} para ${form.clientName||'cliente'}. Alto potencial para soluções biofílicas premium.`,
      missing: form.area ? ['Planta baixa do espaço','Cronograma desejado'] : ['Metragem da área','Planta baixa'],
      recommendations: [
        {item:'Jardim Vertical Premium', why:'Máximo impacto visual para o estilo selecionado'},
        {item:'Projeto Executivo', why:'Garante qualidade de entrega e aumenta ticket'},
        {item:'Sistema de Irrigacao', why:'Reduz manutenção e aumenta vida útil'},
        {item:'Curadoria Botanica', why:'Diferencial premium — eleva percepção de valor'},
      ],
      estimatedRange: {min: form.area ? parseInt(form.area)*800 : 30000, max: form.area ? parseInt(form.area)*1600 : 80000},
      risks: ['Confirmar acesso para visita técnica antes de fechar','Verificar estrutura para jardim vertical'],
      nextSteps: ['Agendar visita técnica presencial','Solicitar planta baixa do espaço','Enviar portfólio de referências similares'],
      saleTips: ['Apresentar projetos similares com fotos antes/depois','Oferecer visita ao showroom'],
    });
    setAiLoading(false);
    setStep(2);
  };

  const STEPS = [{l:'Identificação'},{l:'Contexto'},{l:'Análise IA + Orçamento'}];
  const recs = (aiData?.recommendations || []) as {item:string;why:string}[];
  const missing = (aiData?.missing || []) as string[];
  const saleTips = (aiData?.saleTips || []) as string[];
  const risks = (aiData?.risks || []) as string[];
  const estimatedRange = aiData?.estimatedRange as {min:number;max:number}|undefined;
  const nextSteps = (aiData?.nextSteps || []) as string[];

  return (
    <div>
      <div className="flex-b mb20">
        <div>
          <h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Novo Briefing Consultivo</h2>
          <div className="tsm tmuted mt8">Assistente de vendas com IA</div>
        </div>
        {step===2 && <button className="btn btn-p" onClick={()=>setPropModal(true)}><Ico n="send" s={13}/>Gerar Proposta</button>}
      </div>
      <div className="steps">
        {STEPS.map((s,i) => (
          <React.Fragment key={s.l}>
            <div className="step-nd" onClick={()=>i<step&&setStep(i)}>
              <div className={`step-c ${i<step?'done':i===step?'active':'idle'}`}>{i<step?<Ico n="check" s={11}/>:i+1}</div>
              <div><div className={`step-lbl ${i===step?'active':''}`}>{s.l}</div></div>
            </div>
            {i<STEPS.length-1 && <div className={`step-con ${i<step?'done':''}`}/>}
          </React.Fragment>
        ))}
      </div>

      {step===0 && (
        <div className="card cp">
          <div className="ct mb16">Identificação do Cliente</div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Nome do Cliente</label><input className="fi" placeholder="Ex: Arq. Maria Silva" value={form.clientName} onChange={upd('clientName')}/></div>
            <div className="fg"><label className="fl">Tipo de Cliente</label>
              <select className="fi fi-sel" value={form.clientType} onChange={upd('clientType')}>
                {['arquiteto','cliente final','corporativo','hoteleiro','construtora'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Nome do Projeto</label><input className="fi" placeholder="Ex: Residencia Jardins" value={form.projectName} onChange={upd('projectName')}/></div>
            <div className="fg"><label className="fl">Urgência</label>
              <select className="fi fi-sel" value={form.urgency} onChange={upd('urgency')}>
                <option value="baixa">Baixa — sem prazo</option>
                <option value="normal">Normal — 30-60 dias</option>
                <option value="alta">Alta — menos de 30 dias</option>
                <option value="urgente">Urgente — menos de 2 semanas</option>
              </select>
            </div>
          </div>
          <button className="btn btn-p mt8" onClick={()=>setStep(1)} disabled={!form.clientName}>Próximo</button>
        </div>
      )}

      {step===1 && (
        <div className="card cp">
          <div className="ct mb16">Contexto do Projeto</div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Tipo de Ambiente</label>
              <select className="fi fi-sel" value={form.projectType} onChange={upd('projectType')}>
                {['residencial','comercial','corporativo','hoteleiro','area externa','jardim interno'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
            <div className="fg"><label className="fl">Estilo</label>
              <select className="fi fi-sel" value={form.style} onChange={upd('style')}>
                {['contemporaneo','tropical','minimalista','biofilico','rustico','industrial','japones'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Área (m2)</label><input className="fi" type="number" placeholder="Ex: 80" value={form.area} onChange={upd('area')}/></div>
            <div className="fg"><label className="fl">Orçamento (R$)</label><input className="fi" type="number" placeholder="Ex: 50000" value={form.budget} onChange={upd('budget')}/></div>
          </div>
          <div className="fg"><label className="fl">Contexto do Ambiente</label><textarea className="fi fi-ta" placeholder="Descreva o espaço, iluminação, restrições técnicas..." value={form.environment} onChange={upd('environment')}/></div>
          <div className="fg"><label className="fl">Notas Livres</label><textarea className="fi fi-ta" placeholder="Desejos, referências, histórico com o cliente..." value={form.notes} onChange={upd('notes')}/></div>
          <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf" style={{display:'none'}} onChange={handleFileChange}/>
          <div className="upload-zone mb8" onClick={handleFileClick}>
            <div style={{fontSize:26,marginBottom:6}}>📎</div>
            <div className="fw5 tsm">Clique para anexar arquivos</div>
            <div className="txs tmuted mt8">Plantas, fotos, renders — PDF, JPG, PNG, DWG (max 20MB)</div>
          </div>
          {attachError && <div className="alert ad mb8"><Ico n="alert" s={13}/><span>{attachError}</span></div>}
          {attachedFiles.length > 0 && (
            <div className="mb16">
              {attachedFiles.map(f => (
                <div key={f.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 12px',background:'var(--moss-6)',borderRadius:8,marginBottom:6,border:'1px solid var(--moss-5)'}}>
                  <span style={{fontSize:16}}>📄</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="tsm fw5 trunc">{f.name}</div>
                    <div className="txs tmuted">{f.type} · {fmtSize(f.size)}</div>
                  </div>
                  <button className="btn btn-g btn-xs" onClick={()=>removeFile(f.id)}><Ico n="x" s={11}/></button>
                </div>
              ))}
            </div>
          )}
          <div className="flex" style={{gap:8}}>
            <button className="btn btn-s" onClick={()=>setStep(0)}>Voltar</button>
            <button className="btn btn-p" onClick={runAI} disabled={aiLoading}>
              {aiLoading ? <><div className="spinner"/><span>Analisando...</span></> : <><Ico n="star" s={13}/>Analisar com IA</>}
            </button>
          </div>
        </div>
      )}

      {step===2 && aiData && (
        <div>
          <div className="ai-p">
            <div className="ai-hd"><div className="ai-pulse"/><span className="ai-lbl">Análise IA</span></div>
            <div className="ai-txt mb12">{String(aiData.summary)}</div>
            {missing.length>0 && <div className="flex mb8" style={{gap:6,flexWrap:'wrap'}}><span className="txs fw6 tmuted" style={{alignSelf:'center'}}>Pendente:</span>{missing.map(m=><span key={m} className="chip chip-t">{m}</span>)}</div>}
            <div className="flex" style={{gap:6,flexWrap:'wrap',marginTop:8}}>{saleTips.map((t,i)=><div key={i} className="ai-chip" style={{cursor:'default'}}>{t}</div>)}</div>
          </div>
          {risks.length>0 && <div className="alert aw"><Ico n="alert" s={15}/><div><strong>Alertas:</strong> {risks.join(' · ')}</div></div>}
          {estimatedRange && <div className="alert" style={{background:'var(--blue-light)',color:'var(--blue)',border:'1px solid rgba(26,74,122,.2)'}}><Ico n="layers" s={15}/><div><strong>Faixa estimada:</strong> R$ {estimatedRange.min?.toLocaleString('pt-BR')} – R$ {estimatedRange.max?.toLocaleString('pt-BR')}</div></div>}
          <div className="g2">
            <div>
              <div className="card cp mb16">
                <div className="chd"><span className="ct">Recomendações da IA</span></div>
                {recs.map((r,i) => {
                  const name = typeof r==='string' ? r : r.item;
                  const why = typeof r==='string' ? '' : r.why;
                  const prod = PRODUCTS.find(p => p.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
                  return (
                    <div key={i} className="flex mb12" style={{gap:10,alignItems:'flex-start'}}>
                      <div style={{flex:1}}>
                        <div className="fw5 tsm">{name}</div>
                        {why && <div className="txs tmuted mt8">{why}</div>}
                        {prod && <div className="txs tmuted mt8">R$ {prod.basePrice.toLocaleString('pt-BR')}/{prod.unit}</div>}
                      </div>
                      <button className="btn btn-s btn-xs" onClick={()=>prod&&addItem(prod)} disabled={prod&&!!items.find(i=>i.id===prod.id)}>{prod&&items.find(i=>i.id===prod.id)?'Adicionado':'+ Add'}</button>
                    </div>
                  );
                })}
                <div className="divider"/>
                <div className="ct tsm mb8">Catálogo Completo</div>
                <div className="flex mb8" style={{gap:5,flexWrap:'wrap'}}>
                  {cats.map(c=><button key={c} className={`btn btn-xs ${catFilter===c?'btn-p':'btn-s'}`} onClick={()=>setCatFilter(c)}>{c}</button>)}
                </div>
                <div style={{maxHeight:220,overflowY:'auto'}}>
                  {visProds.map(p=>(
                    <div key={p.id} className="flex-b mb6" style={{paddingBottom:6,borderBottom:'1px solid var(--paper-2)'}}>
                      <div style={{flex:1,minWidth:0}}><div className="tsm fw5 trunc">{p.name}</div><div className="txs tmuted">R$ {p.basePrice.toLocaleString('pt-BR')}/{p.unit} · {p.cat}</div></div>
                      <button className="btn btn-g btn-xs" onClick={()=>addItem(p)} disabled={!!items.find(i=>i.id===p.id)}>{items.find(i=>i.id===p.id)?'✓':'+'}</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card cp">
                <div className="ct mb8">Próximas Ações</div>
                {nextSteps.map((s,i)=>(
                  <div key={i} className="flex mb8" style={{gap:8}}>
                    <div style={{width:20,height:20,borderRadius:'50%',background:'var(--moss-6)',color:'var(--moss)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</div>
                    <span className="tsm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card cp">
              <div className="chd"><span className="ct">Orçamento em Construção</span></div>
              {items.length===0 ? (
                <div className="empty-st" style={{padding:'28px 0'}}><div style={{fontSize:30,marginBottom:8}}>🌿</div><div className="tsm tmuted">Adicione produtos</div></div>
              ) : (
                <>
                  {items.map(item=>(
                    <div key={item.id} className="mb12" style={{paddingBottom:12,borderBottom:'1px solid var(--paper-2)'}}>
                      <div className="flex-b mb6"><span className="fw6 tsm">{item.name}</span><button className="btn btn-g btn-xs" onClick={()=>remItem(item.id)}><Ico n="x" s={11}/></button></div>
                      <div className="flex" style={{gap:8,marginBottom:4}}>
                        <div style={{flex:1}}><label className="fl">Qtd</label><input className="fi fi-sm" type="number" min="1" value={item.qty} onChange={e=>updItem(item.id,'qty',e.target.value)}/></div>
                        <div style={{flex:1}}><label className="fl">Desc%</label><input className="fi fi-sm" type="number" min="0" max="30" value={item.discount} onChange={e=>updItem(item.id,'discount',e.target.value)}/></div>
                        <div style={{flex:1}}><label className="fl">Subtotal</label><div className="fi fi-sm" style={{background:'var(--paper)',display:'flex',alignItems:'center',fontWeight:600}}>R$ {Math.round(item.basePrice*item.qty*(1-item.discount/100)).toLocaleString('pt-BR')}</div></div>
                      </div>
                    </div>
                  ))}
                  <div className="divider"/>
                  <div className="flex-b mb8"><span className="fw6">Total</span><span className="fd" style={{fontSize:20,fontWeight:500}}>R$ {Math.round(total).toLocaleString('pt-BR')}</span></div>
                  <div className="flex-b mb16"><span className="tsm tmuted">Margem estimada</span><span className={avgMargin>=40?'mk':avgMargin>=32?'mw':'mb-c'} style={{fontSize:15}}>{avgMargin}%</span></div>
                  {avgMargin<32 && <div className="alert ad"><Ico n="alert" s={13}/><div><strong>Margem crítica!</strong> Requer aprovação da diretoria.</div></div>}
                  {avgMargin>=32 && avgMargin<38 && <div className="alert aw"><Ico n="alert" s={13}/><div>Margem abaixo de 38%. Verifique ajustes.</div></div>}
                  {avgMargin>=38 && <div className="alert as"><Ico n="check" s={13}/><div>Margem OK — aprovação automática habilitada.</div></div>}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Modal open={propModal} onClose={()=>setPropModal(false)} title="Gerar Proposta Comercial" sub="Confirme os parâmetros finais">
        {avgMargin>=38 ? <div className="alert as mb12"><Ico n="check" s={13}/><span>Margem de <strong>{avgMargin}%</strong> — aprovação automática.</span></div> : <div className="alert aw mb12"><Ico n="alert" s={13}/><span>Margem de <strong>{avgMargin}%</strong> — encaminhada para aprovação.</span></div>}
        <div className="fg-row">
          <div className="fg"><label className="fl">Versão</label><select className="fi fi-sel"><option>Premium (completo)</option><option>Alternativa (enxuta)</option></select></div>
          <div className="fg"><label className="fl">Validade</label><select className="fi fi-sel"><option>15 dias</option><option>30 dias</option></select></div>
        </div>
        <div className="fg"><label className="fl">Pagamento</label><select className="fi fi-sel"><option>50% entrada + 50% entrega</option><option>30/40/30</option><option>À vista (5% desconto)</option></select></div>
        <div className="fg"><label className="fl">Mensagem ao Cliente</label><textarea className="fi fi-ta" placeholder="Nota pessoal para a proposta..."/></div>
        <div className="flex mt8" style={{gap:8}}>
          <button className="btn btn-s" onClick={()=>setPropModal(false)}>Cancelar</button>
          <button className="btn btn-p"><Ico n="send" s={13}/>Gerar e Enviar</button>
          <button className="btn btn-s"><Ico n="download" s={13}/>Baixar PDF</button>
        </div>
      </Modal>
    </div>
  );
}

/* ── PIPELINE ── */
function PipelinePage({go}: {go:(p:string)=>void}) {
  const [view, setView] = useState('kanban');
  const [search, setSearch] = useState('');
  const [stageF, setStageF] = useState('Todos');
  const [opps, setOpps] = useState(OPPS);
  const [draggedOpp, setDraggedOpp] = useState<{id:string,fromStage:string}|null>(null);
  const filtered = opps.filter(o => {
    const ms = stageF==='Todos' || o.stage===stageF;
    const mq = o.name.toLowerCase().includes(search.toLowerCase()) || o.client.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const handleDragStart = (oppId: string, stage: string) => {
    setDraggedOpp({id: oppId, fromStage: stage});
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStage: string) => {
    if (!draggedOpp) return;
    const updatedOpps = opps.map(o => 
      o.id === draggedOpp.id && o.stage === draggedOpp.fromStage
        ? {...o, stage: targetStage}
        : o
    );
    setOpps(updatedOpps);
    setDraggedOpp(null);
  };
  return (
    <div>
      <div className="flex-b mb20">
        <div>
          <h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Pipeline Comercial</h2>
          <div className="tsm tmuted mt8">{OPPS.filter(o=>o.stage!=='Perdido').length} oportunidades · R$ {(OPPS.filter(o=>!['Ganho','Perdido'].includes(o.stage)).reduce((a,o)=>a+o.value,0)/1000).toFixed(0)}k em aberto</div>
        </div>
        <div className="flex" style={{gap:8}}>
          <div style={{display:'flex',background:'var(--paper-2)',borderRadius:8,padding:3,gap:2}}>
            {['kanban','lista'].map(v=><button key={v} className="btn btn-sm" style={{background:view===v?'#fff':'transparent',borderColor:view===v?'var(--paper-3)':'transparent',color:view===v?'var(--ink-2)':'var(--ink-4)'}} onClick={()=>setView(v)}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>)}
          </div>
          <button className="btn btn-p btn-sm" onClick={()=>go('briefing')}><Ico n="plus" s={13}/>Nova Op.</button>
        </div>
      </div>
      <div className="flex mb16" style={{gap:8,flexWrap:'wrap'}}>
        <div style={{position:'relative',flex:1,minWidth:180}}>
          <Ico n="search" s={13} style={{position:'absolute',left:10,top:10,color:'var(--ink-5)'}}/>
          <input className="fi" style={{paddingLeft:30}} placeholder="Buscar oportunidade ou cliente..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="fi fi-sel" style={{width:'auto',minWidth:135}} value={stageF} onChange={e=>setStageF(e.target.value)}>
          <option value="Todos">Todos os estágios</option>
          {STAGES.map(s=><option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
        </select>
      </div>
      {view==='kanban' ? (
        <div className="kanban">
          {STAGES.map(stage => {
            const cards = filtered.filter(o=>o.stage===stage);
            const tot = cards.reduce((a,o)=>a+o.value,0);
            return (
              <div key={stage} className={`kol ${draggedOpp ? 'drag-over' : ''}`} onDragOver={handleDragOver} onDrop={() => handleDrop(stage)}>
                <div className="kol-hd"><span className="kol-nm">{STAGE_LABELS[stage]}</span><span className="kol-ct">{cards.length}</span></div>
                {tot>0 && <div className="txs tmuted mb8" style={{fontWeight:600}}>R$ {(tot/1000).toFixed(0)}k</div>}
                {cards.map(o=>(
                  <div 
                    key={o.id} 
                    className={`kcard ${draggedOpp?.id === o.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(o.id, o.stage)}
                    onDragEnd={() => setDraggedOpp(null)}
                  >
                    <div className="kc-nm">{o.name}</div>
                    <div className="kc-cl">{o.client}</div>
                    <div className="flex-b mb6"><span className="fw6" style={{fontSize:13}}>R$ {(o.value/1000).toFixed(0)}k</span><MBadge m={o.margin}/></div>
                    <div className="flex" style={{gap:5}}><span className={`badge ${o.type==='Projeto'?'bb':'bm'}`} style={{fontSize:10}}>{o.type}</span><PBadge p={o.priority}/></div>
                  </div>
                ))}
                {cards.length===0 && <div className="txs tmuted" style={{textAlign:'center',padding:'14px 0',opacity:.45}}>Nenhuma</div>}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="scroll-x">
            <table className="tbl">
              <thead><tr><th>Oportunidade</th><th>Cliente</th><th>Tipo</th><th>Estágio</th><th>Valor</th><th>Margem</th><th>Prioridade</th></tr></thead>
              <tbody>
                {filtered.map(o=>(
                  <tr key={o.id}>
                    <td><div className="fw6">{o.name}</div><div className="txs tmuted">{o.id}</div></td>
                    <td className="tsm">{o.client}</td>
                    <td><span className={`badge ${o.type==='Projeto'?'bb':'bm'}`}>{o.type}</span></td>
                    <td><SBadge s={o.stage}/></td>
                    <td className="fw5">R$ {o.value.toLocaleString('pt-BR')}</td>
                    <td><MBadge m={o.margin}/></td>
                    <td><PBadge p={o.priority}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PROPOSALS ── */
function ProposalsPage() {
  const [sel, setSel] = useState<string|null>(null);
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const opp = sel ? OPPS.find(o=>o.id===sel) : null;

  const genText = async (o: Opp) => {
    setAiLoading(true); setAiText('');
    await new Promise(r => setTimeout(r, 1000));
    setAiText(`A Mama Flora apresenta esta proposta desenvolvida com dedicação exclusiva para ${o.client}. Com mais de uma década de excelência em paisagismo premium, nossa equipe selecionou cada elemento para criar uma experiência botânica singular.\n\nO projeto ${o.name} representa um investimento de R$ ${o.value.toLocaleString('pt-BR')} na transformação de um espaço comum em um ambiente vivo, sofisticado e duradouro.\n\nEstamos prontos para iniciar. Vamos transformar este espaço juntos.`);
    setAiLoading(false);
  };

  const downloadPDF = async (o: Opp, presentation?: string) => {
    setPdfLoading(true);
    try {
      const res = await fetch('/api/proposal-pdf', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          id: o.id,
          name: o.name,
          client: o.client,
          value: o.value,
          margin: o.margin,
          products: o.products,
          date: o.date,
          stage: o.stage,
          type: o.type,
          presentationText: presentation || '',
        }),
      });
      if (!res.ok) throw new Error('Falha ao gerar PDF');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `proposta-${o.id}-mama-flora.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch(e) {
      console.error('[PDF]', e);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setPdfLoading(false);
    }
  };

  const propTabs = ['preview','visual','financeiro','historico'];
  const propTabLabels: Record<string,string> = {preview:'Preview',visual:'Visual',financeiro:'Financeiro',historico:'Histórico'};

  if (opp) {
    return (
      <div>
        <div className="flex-b mb20">
          <button className="btn btn-g" onClick={()=>{setSel(null);setAiText('');setActiveTab('preview');}}><Ico n="arrow" s={14} style={{transform:'rotate(180deg)'}}/>Voltar</button>
          <div className="flex" style={{gap:7,alignItems:'center'}}>
            <button className="btn btn-s btn-sm"><Ico n="edit" s={13}/>Editar</button>
            <button className="btn btn-s btn-sm"><Ico n="send" s={13}/>Enviar</button>
            <button className="btn btn-gold btn-sm" disabled={pdfLoading} onClick={()=>opp && downloadPDF(opp, aiText)}>
              {pdfLoading
                ? <><div className="spinner"/>Gerando PDF...</>
                : <><Ico n="download" s={13}/>Baixar PDF</>
              }
            </button>
          </div>
        </div>
        <div className="tabs">
          {propTabs.map(t=><button key={t} className={`tab-btn ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{propTabLabels[t]}</button>)}
        </div>

        {activeTab==='preview' && (
          <div className="prop-preview">
            <div className="prop-cover">
              <div className="prop-cover-lbl">Mama Flora · Paisagismo Premium · Proposta Exclusiva</div>
              <div className="prop-cover-title">{opp.name}</div>
              <div className="prop-cover-sub">{opp.client} · {new Date().toLocaleDateString('pt-BR',{year:'numeric',month:'long',day:'numeric'})}</div>
              <div className="flex mt20" style={{gap:12,position:'relative',zIndex:1}}>
                {[['Investimento',`R$ ${opp.value.toLocaleString('pt-BR')}`],['Prazo','30-45 dias úteis'],['Validade','30 dias']].map(([k,v])=>(
                  <div key={k} style={{background:'rgba(255,255,255,.1)',borderRadius:8,padding:'10px 16px'}}>
                    <div style={{fontSize:9,color:'rgba(255,255,255,.45)',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:4}}>{k}</div>
                    <div style={{color:'#fff',fontFamily:'var(--fd)',fontSize:16,fontWeight:500}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="prop-body">
              <div className="prop-sec">
                <div className="prop-sec-title">Apresentação</div>
                {aiText ? (
                  <p className="prop-p" style={{whiteSpace:'pre-line'}}>{aiText}</p>
                ) : (
                  <div>
                    <p className="prop-p tmuted mb12">Gere o texto personalizado com IA para este cliente.</p>
                    <button className="btn btn-p btn-sm" onClick={()=>genText(opp)} disabled={aiLoading}>
                      {aiLoading ? <><div className="spinner"/>Gerando...</> : <><Ico n="star" s={13}/>Gerar com IA</>}
                    </button>
                  </div>
                )}
              </div>
              <div className="prop-sec">
                <div className="prop-sec-title">Soluções Propostas</div>
                <div className="flex mb16" style={{gap:7,flexWrap:'wrap'}}>
                  {opp.products.map(p=><span key={p} className="chip">{p}</span>)}
                </div>
                <div className="img-grid mb16">
                  {[...IMG.jardim,...IMG.parede,...IMG.ambiente].slice(0,3).map((img,i)=>(
                    <div key={i} className="img-tile" style={{height:160}}>
                      <img src={img} alt="Referência visual"/>
                      <div className="img-tile-lbl">{opp.products[i]||'Referência visual'}</div>
                    </div>
                  ))}
                </div>
                <table className="tbl">
                  <thead><tr><th>Item</th><th>Especificação</th><th>Qtd</th><th>Valor</th></tr></thead>
                  <tbody>
                    {opp.products.map(p=>{
                      const v = Math.round(opp.value/opp.products.length/100)*100;
                      return <tr key={p}><td className="fw5">{p}</td><td className="tsm tmuted">Conforme briefing</td><td>1</td><td className="fw6">R$ {v.toLocaleString('pt-BR')}</td></tr>;
                    })}
                    <tr style={{background:'var(--moss-6)'}}><td colSpan={3} className="fw6">Total do Investimento</td><td className="fw7" style={{fontSize:15}}>R$ {opp.value.toLocaleString('pt-BR')}</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="prop-sec">
                <div className="prop-sec-title">Referências Visuais</div>
                <div className="img-grid">
                  {IMG.ambiente.map((img,i)=>(
                    <div key={i} className="img-tile" style={{height:140}}>
                      <img src={img} alt="Ambientação"/>
                      <div className="img-tile-lbl">Ambientação {i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="prop-sec">
                <div className="prop-sec-title">Condições Comerciais</div>
                <div className="g4">
                  {[['Validade','30 dias'],['Pagamento','50% entrada + 50% entrega'],['Prazo','30-45 dias úteis'],['Garantia','12 meses']].map(([k,v])=>(
                    <div key={k} style={{background:'var(--paper)',borderRadius:12,padding:13}}>
                      <div className="txs tmuted mb4 fw6">{k}</div>
                      <div className="fw5 tsm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{textAlign:'center',padding:'12px 0',borderTop:'1px solid var(--paper-2)'}}>
                <div style={{fontFamily:'var(--fd)',fontStyle:'italic',fontSize:14,color:'var(--moss)',marginBottom:4}}>Mama Flora · Paisagismo que Transforma</div>
                <div className="txs tmuted">contato@mamaflora.com.br · (11) 4040-1234</div>
              </div>
            </div>
          </div>
        )}

        {activeTab==='visual' && (
          <div className="card cp">
            <div className="chd"><span className="ct">Banco Visual — Imagens da Proposta</span><button className="btn btn-s btn-sm"><Ico n="plus" s={12}/>Adicionar</button></div>
            <p className="tsm tmuted mb16">Selecione as imagens para a proposta. A IA sugere com base no briefing.</p>
            {[{title:'Jardins e Paisagismo',imgs:IMG.jardim},{title:'Paredes Verdes',imgs:IMG.parede},{title:'Ambientações',imgs:IMG.ambiente}].map(sec=>(
              <div key={sec.title} className="mb20">
                <div className="ct txs tmuted mb12">{sec.title.toUpperCase()}</div>
                <div className="img-grid">
                  {sec.imgs.map((img,i)=>(
                    <div key={i} className="img-tile" style={{height:160,cursor:'pointer'}}>
                      <img src={img} alt="Visual"/>
                      <div className="img-tile-lbl">{sec.title} {i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==='financeiro' && (
          <div className="card cp">
            <div className="ct mb16">Breakdown Financeiro</div>
            <div className="g4 mb20">
              {[['Valor Bruto',`R$ ${opp.value.toLocaleString('pt-BR')}`],['Margem Bruta',`${opp.margin}%`],['Desconto','0%'],['Status',opp.margin>=38?'Aprovado':'Revisar']].map(([k,v])=>(
                <div className="metric" key={k}><div className="mlbl">{k}</div><div className="mval" style={{fontSize:18}}>{v}</div></div>
              ))}
            </div>
            <table className="tbl">
              <thead><tr><th>Item</th><th>Base</th><th>Qtd</th><th>Desc.</th><th>Subtotal</th><th>Margem</th></tr></thead>
              <tbody>
                {opp.products.map(p=>{
                  const base = Math.round(opp.value/opp.products.length/100)*100;
                  return <tr key={p}><td className="fw5">{p}</td><td>R$ {base.toLocaleString('pt-BR')}</td><td>1</td><td>0%</td><td>R$ {base.toLocaleString('pt-BR')}</td><td><MBadge m={opp.margin}/></td></tr>;
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab==='historico' && (
          <div className="card cp">
            <div className="ct mb16">Histórico da Proposta</div>
            <div className="tl">
              {[{d:'Hoje, 10:30',t:'Proposta gerada pela IA',s:'Sistema v1.0'},{d:'Ontem, 16h',t:'Briefing concluído',s:'Equipe comercial'},{d:'Ontem, 14h',t:'Oportunidade criada',s:'Origem: indicação de parceiro'}].map((it,i)=>(
                <div className="tl-item" key={i}><div className="tl-dot"/><div className="tl-d">{it.d}</div><div className="tl-t">{it.t}</div><div className="tl-s">{it.s}</div></div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex-b mb20">
        <div><h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Propostas Comerciais</h2><div className="tsm tmuted mt8">Geração automática com IA</div></div>
        <button className="btn btn-p btn-sm"><Ico n="plus" s={13}/>Nova Proposta</button>
      </div>
      <div className="card">
        <div className="scroll-x">
          <table className="tbl">
            <thead><tr><th>Proposta</th><th>Cliente</th><th>Valor</th><th>Margem</th><th>Estágio</th><th>Produtos</th><th>Data</th><th></th></tr></thead>
            <tbody>
              {OPPS.filter(o=>['Proposta','Negociacao','Ganho'].includes(o.stage)).map(o=>(
                <tr key={o.id}>
                  <td><div className="fw6">{o.name}</div><div className="txs tmuted">{o.id}</div></td>
                  <td className="tsm">{o.client}</td>
                  <td className="fw5">R$ {o.value.toLocaleString('pt-BR')}</td>
                  <td><MBadge m={o.margin}/></td>
                  <td><SBadge s={o.stage}/></td>
                  <td><div className="flex" style={{gap:4,flexWrap:'wrap'}}>{o.products.slice(0,2).map(p=><span key={p} className="chip" style={{fontSize:10}}>{p}</span>)}{o.products.length>2&&<span className="txs tmuted">+{o.products.length-2}</span>}</div></td>
                  <td className="txs tmuted">{o.date}</td>
                  <td><div className="flex" style={{gap:4}}><button className="btn btn-g btn-xs" onClick={()=>{setSel(o.id);setActiveTab('preview');}}><Ico n="eye" s={11}/>Ver</button><button className="btn btn-gold btn-xs" disabled={pdfLoading} onClick={()=>downloadPDF(o)}><Ico n="download" s={11}/>PDF</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── CRM ── */
function CRMPage() {
  const [tab, setTab] = useState('clientes');
  const [sel, setSel] = useState<string|null>(null);
  const client = CLIENTS.find(c=>c.id===sel);
  if (client) {
    const cOpps = OPPS.filter(o => o.client.includes(client.name.split(' ').slice(-1)[0]));
    return (
      <div>
        <button className="btn btn-g mb16" onClick={()=>setSel(null)}><Ico n="arrow" s={14} style={{transform:'rotate(180deg)'}}/>Voltar</button>
        <div className="g2">
          <div>
            <div className="card cp mb16">
              <div className="flex mb16" style={{gap:14}}>
                <Avatar name={client.name} size={50}/>
                <div>
                  <div className="fd" style={{fontSize:18,fontWeight:500}}>{client.name}</div>
                  <div className="tsm tmuted mt8">{client.type}</div>
                  <div className="flex mt8" style={{gap:6}}>
                    <span className={`badge ${client.status==='Ativo'?'bm':'bgy'}`}>{client.status}</span>
                    <span className={`badge ${client.ltv==='Alto'?'bm':client.ltv==='Medio'?'bg':'bgy'}`}>LTV {client.ltv}</span>
                  </div>
                </div>
              </div>
              <div className="divider"/>
              {[['E-mail',client.email],['Telefone',client.phone]].map(([k,v])=>(
                <div key={k} className="flex-b mb8"><span className="tsm tmuted">{k}</span><span className="tsm fw5">{v}</span></div>
              ))}
            </div>
            <div className="g2 mb16">
              {[['Projetos',String(client.projects)],['Total','R$ '+client.totalValue.toLocaleString('pt-BR')]].map(([k,v])=>(
                <div className="metric" key={k}><div className="mlbl">{k}</div><div className="mval" style={{fontSize:20}}>{v}</div></div>
              ))}
            </div>
            <div className="card cp">
              <div className="ct mb12">Ações Rápidas</div>
              {['Enviar WhatsApp','Agendar Reunião','Nova Oportunidade','Ver Propostas'].map(a=>(
                <button key={a} className="btn btn-s btn-sm mb8" style={{width:'100%',justifyContent:'flex-start'}}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="card cp mb16">
              <div className="chd"><span className="ct">Oportunidades</span></div>
              {cOpps.length>0 ? cOpps.map(o=>(
                <div key={o.id} className="flex-b mb12 pb12" style={{borderBottom:'1px solid var(--paper-2)'}}>
                  <div><div className="fw5 tsm">{o.name}</div><div className="txs tmuted mt8">{o.date}</div></div>
                  <div className="flex" style={{gap:6}}><SBadge s={o.stage}/><span className="fw5 tsm">R$ {(o.value/1000).toFixed(0)}k</span></div>
                </div>
              )) : <div className="tsm tmuted">Nenhuma oportunidade.</div>}
            </div>
            <div className="card cp">
              <div className="ct mb12">Histórico</div>
              <div className="tl">
                {[{d:'08 Jun',t:'Reunião presencial',s:'Levantamento de necessidades'},{d:'02 Jun',t:'E-mail enviado',s:'Acompanhamento da proposta'},{d:'15 Mai',t:'Proposta aprovada',s:'Faria Lima Biofilia'}].map((it,i)=>(
                  <div className="tl-item" key={i}><div className="tl-dot"/><div className="tl-d">{it.d}</div><div className="tl-t">{it.t}</div><div className="tl-s">{it.s}</div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex-b mb20">
        <div><h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>CRM Comercial</h2><div className="tsm tmuted mt8">{CLIENTS.length} contatos ativos</div></div>
        <button className="btn btn-p btn-sm"><Ico n="plus" s={13}/>Novo Contato</button>
      </div>
      <div className="tabs">{['clientes','leads','follow-up'].map(t=><button key={t} className={`tab-btn ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
      {tab==='clientes' && (
        <div className="card">
          <div className="scroll-x">
            <table className="tbl">
              <thead><tr><th>Nome</th><th>Tipo</th><th>E-mail</th><th>Projetos</th><th>Total</th><th>LTV</th><th>Status</th></tr></thead>
              <tbody>
                {CLIENTS.map(c=>(
                  <tr key={c.id} onClick={()=>setSel(c.id)}>
                    <td><div className="flex" style={{gap:10}}><Avatar name={c.name} size={26}/><div className="fw6">{c.name}</div></div></td>
                    <td><span className={`badge ${c.type.includes('Arquitet')?'bb':c.type==='Corporativo'?'bt':'bgy'}`}>{c.type}</span></td>
                    <td className="tsm tmuted">{c.email}</td>
                    <td className="fw5">{c.projects}</td>
                    <td className="fw5">R$ {c.totalValue.toLocaleString('pt-BR')}</td>
                    <td><span className={`badge ${c.ltv==='Alto'?'bm':c.ltv==='Medio'?'bg':'bgy'}`}>{c.ltv}</span></td>
                    <td><span className={`badge ${c.status==='Ativo'?'bm':'bgy'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==='leads' && (
        <div className="card cp">
          <div className="chd"><span className="ct">Leads em Qualificação</span></div>
          {[{name:'Eduardo Campos',src:'Instagram',budget:'R$ 25-40k',status:'Quente'},{name:'Studio LAB Arq.',src:'Indicação',budget:'R$ 80-150k',status:'Morno'},{name:'Residencial Green Park',src:'LinkedIn',budget:'R$ 200k+',status:'Quente'},{name:'Dra. Fernanda Costa',src:'Google',budget:'R$ 15-25k',status:'Frio'}].map((l,i)=>(
            <div key={i} className="flex-b mb12 pb12" style={{borderBottom:'1px solid var(--paper-2)'}}>
              <div className="flex" style={{gap:10}}><Avatar name={l.name} size={30}/><div><div className="fw5">{l.name}</div><div className="txs tmuted">{l.src}</div></div></div>
              <div className="flex" style={{gap:8}}><span className="txs tmuted">{l.budget}</span><span className={`badge ${l.status==='Quente'?'br':l.status==='Morno'?'bg':'bgy'}`}>{l.status}</span><button className="btn btn-p btn-xs">Qualificar</button></div>
            </div>
          ))}
        </div>
      )}
      {tab==='follow-up' && (
        <div className="card cp">
          <div className="chd"><span className="ct">Follow-ups Pendentes</span></div>
          {[{client:'Familia Rodrigues',action:'Ligar para confirmar aprovação da proposta',due:'Hoje',p:'Alta'},{client:'Construtora Nortao',action:'Enviar portfólio corporativo',due:'Amanhã',p:'Alta'},{client:'Fasano Group',action:'Agendar visita técnica',due:'13/06',p:'Media'}].map((f,i)=>(
            <div key={i} className={`acard ${f.p==='Alta'?'ac-warn':'ac-ok'} mb12`}>
              <div className="flex-b"><div><div className="fw5 tsm">{f.client}</div><div className="txs tmuted mt8">{f.action}</div></div><div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6}}><span className={`badge ${f.due==='Hoje'?'br':'bg'}`}>{f.due}</span><button className="btn btn-s btn-xs mt8">Concluir</button></div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── APPROVALS ── */
function ApprovalsPage() {
  const [items, setItems] = useState(APPROVALS);
  const [aiModal, setAiModal] = useState<Approval|null>(null);
  const [aiReason, setAiReason] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const act = (id: string, status: string) => setItems(prev => prev.map(a => a.id===id ? {...a, status} : a));
  const askAI = async (appr: Approval) => {
    setAiLoading(true); setAiReason('');
    await new Promise(r => setTimeout(r, 900));
    setAiReason(`Com margem final de ${appr.finalMargin}%, ${appr.finalMargin>=32 ? 'o projeto ainda mantém rentabilidade aceitável — recomendo aprovar.' : 'a rentabilidade está comprometida. Sugiro negociar contrapartidas antes de aprovar.'}`);
    setAiLoading(false);
  };
  return (
    <div>
      <div className="flex-b mb20">
        <div><h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Fluxo de Aprovações</h2><div className="tsm tmuted mt8">Exceções comerciais e validação de margens</div></div>
      </div>
      {items.filter(a=>a.status==='pending').length>0 && <div className="alert aw"><Ico n="alert" s={15}/><div><strong>{items.filter(a=>a.status==='pending').length} aprovações pendentes.</strong> Demora pode impactar conversão.</div></div>}
      <div className="card cp mb20">
        <div className="ct mb12">Regras de Aprovação</div>
        <div className="g3">
          {[{t:'Automática',d:'Margem >= 38% — liberada instantaneamente.',c:'var(--moss)'},{t:'Comercial',d:'Margem 32-37% — revisão do consultor sênior.',c:'var(--gold)'},{t:'Diretoria',d:'Margem < 32% — aprovação explícita da diretoria.',c:'var(--red)'}].map(f=>(
            <div key={f.t} style={{background:'var(--paper)',borderRadius:12,padding:14,borderLeft:`3px solid ${f.c}`}}>
              <div className="fw6 tsm mb4" style={{color:f.c}}>{f.t}</div>
              <div className="txs tmuted">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
      {items.map(a=>(
        <div key={a.id} className={`acard ${a.finalMargin<32?'ac-danger':a.status==='auto'||a.status==='approved'?'ac-ok':'ac-warn'} mb12`}>
          <div className="flex-b mb12">
            <div><div className="fw6" style={{fontSize:14}}>{a.name}</div><div className="txs tmuted mt8">{a.id} · {a.by} · {a.date}</div></div>
            <div className="flex" style={{gap:6}}>
              {a.status==='pending' && <><button className="btn btn-g btn-sm" onClick={()=>{setAiModal(a);askAI(a);}}>Consultar IA</button><button className="btn btn-s btn-sm" onClick={()=>act(a.id,'rejected')}>Recusar</button><button className="btn btn-p btn-sm" onClick={()=>act(a.id,'approved')}>Aprovar</button></>}
              {a.status==='approved' && <span className="badge bm" style={{fontSize:12,padding:'5px 12px'}}>Aprovado</span>}
              {a.status==='rejected' && <span className="badge br" style={{fontSize:12,padding:'5px 12px'}}>Recusado</span>}
              {a.status==='auto' && <span className="badge bm" style={{fontSize:12,padding:'5px 12px'}}>Auto-aprovado</span>}
            </div>
          </div>
          <div className="g4 mb12">
            {[['Valor',`R$ ${a.value.toLocaleString('pt-BR')}`],['Margem Original',`${a.margin}%`],['Desconto',`${a.discount}%`],['Margem Final',`${a.finalMargin}%`]].map(([k,v],i)=>(
              <div key={k}><div className="txs tmuted mb4">{k}</div><div className={`fw6 ${i===3?(a.finalMargin>=38?'mk':a.finalMargin>=32?'mw':'mb-c'):''}`}>{v}</div></div>
            ))}
          </div>
          <div className="tsm tmuted"><strong>Justificativa:</strong> {a.reason}</div>
          {a.finalMargin<32 && a.status==='pending' && <div className="alert ad mt12"><Ico n="alert" s={13}/><div><strong>Margem crítica!</strong> Verifique contrapartidas antes de aprovar.</div></div>}
        </div>
      ))}
      <Modal open={!!aiModal} onClose={()=>{setAiModal(null);setAiReason('');}} title="Consulta IA — Análise Comercial" sub={aiModal?.name}>
        <div className="ai-p">
          <div className="ai-hd"><div className="ai-pulse"/><span className="ai-lbl">Recomendação da IA</span></div>
          {aiLoading ? <div className="flex" style={{gap:8}}><div className="spinner"/><span className="ai-txt">Analisando...</span></div> : <div className="ai-txt">{aiReason}</div>}
        </div>
        <div className="flex mt8" style={{gap:8}}>
          <button className="btn btn-s btn-sm" onClick={()=>act(aiModal?.id||'','rejected')}>Rejeitar</button>
          <button className="btn btn-p btn-sm" onClick={()=>act(aiModal?.id||'','approved')}>Aprovar</button>
          <button className="btn btn-g btn-sm" onClick={()=>{setAiModal(null);setAiReason('');}}>Fechar</button>
        </div>
      </Modal>
    </div>
  );
}

/* ── ARCHITECTS ── */
function ArchitectPage() {
  const [tab, setTab] = useState('requests');
  const [form, setForm] = useState({arch:'',studio:'',project:'',type:'residencial',area:'',notes:''});
  const [submitted, setSubmitted] = useState(false);
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(f => ({...f, [k]:e.target.value}));
  return (
    <div>
      <div className="flex-b mb20">
        <div><h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Portal de Parceiros</h2><div className="tsm tmuted mt8">Arquitetos e Escritórios de Arquitetura</div></div>
        <button className="btn btn-p btn-sm" onClick={()=>setTab('new')}><Ico n="plus" s={13}/>Nova Solicitação</button>
      </div>
      <div className="tabs">{['requests','parceiros','new'].map(t=><button key={t} className={`tab-btn ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t==='requests'?'Solicitações':t==='parceiros'?'Parceiros':'Nova Solicitação'}</button>)}</div>
      {tab==='requests' && (
        <div>
          <div className="g3 mb16">
            {[{l:'Solicitações Ativas',v:PARTNERS.length},{l:'Em Orçamento',v:PARTNERS.filter(p=>p.stage==='Orcamento').length},{l:'Proposta Enviada',v:PARTNERS.filter(p=>p.stage==='Proposta').length}].map(m=>(
              <div className="metric" key={m.l}><div className="mlbl">{m.l}</div><div className="mval">{m.v}</div></div>
            ))}
          </div>
          <div className="card">
            <div className="scroll-x">
              <table className="tbl">
                <thead><tr><th>Arquiteto</th><th>Projeto</th><th>Estágio</th><th>Status</th><th>Valor Est.</th><th>Data</th><th>Prioridade</th></tr></thead>
                <tbody>
                  {PARTNERS.map(r=>(
                    <tr key={r.id}>
                      <td><div className="flex" style={{gap:8}}><Avatar name={r.arch} size={26}/><span className="fw5">{r.arch}</span></div></td>
                      <td className="tsm">{r.project}</td>
                      <td><span className="badge bgy">{r.stage}</span></td>
                      <td><span className={`badge ${r.status==='Proposta enviada'?'bm':r.status==='Em andamento'?'bb':'bt'}`}>{r.status}</span></td>
                      <td className="fw5">{r.value>0?`R$ ${r.value.toLocaleString('pt-BR')}`:'—'}</td>
                      <td className="txs tmuted">{r.date}</td>
                      <td><PBadge p={r.priority}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {tab==='parceiros' && (
        <div className="card">
          <div className="scroll-x">
            <table className="tbl">
              <thead><tr><th>Arquiteto</th><th>E-mail</th><th>Projetos</th><th>Volume Total</th><th>LTV</th><th>Status</th></tr></thead>
              <tbody>
                {CLIENTS.filter(c=>c.type.includes('Arquitet')||c.type.includes('Arquiteto')).map(c=>(
                  <tr key={c.id}>
                    <td><div className="flex" style={{gap:10}}><Avatar name={c.name} size={26}/><div className="fw6">{c.name}</div></div></td>
                    <td className="tsm tmuted">{c.email}</td>
                    <td className="fw5">{c.projects}</td>
                    <td className="fw5">R$ {c.totalValue.toLocaleString('pt-BR')}</td>
                    <td><span className={`badge ${c.ltv==='Alto'?'bm':'bg'}`}>{c.ltv}</span></td>
                    <td><span className={`badge ${c.status==='Ativo'?'bm':'bgy'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab==='new' && (submitted ? (
        <div className="card cp" style={{textAlign:'center',padding:44}}>
          <div style={{fontSize:44,marginBottom:14}}>🌿</div>
          <div className="fd" style={{fontSize:20,color:'var(--moss)',fontWeight:500,marginBottom:8}}>Solicitação Recebida!</div>
          <div className="tsm tmuted mb16">Retornaremos em até 24h com orçamento inicial.</div>
          <div className="badge bm mb16" style={{fontSize:12,padding:'6px 16px'}}>Protocolo: PR-{Math.floor(Math.random()*900+100)}</div>
          <div><button className="btn btn-s" onClick={()=>setSubmitted(false)}>Nova solicitação</button></div>
        </div>
      ) : (
        <div className="card cp">
          <div className="ct mb16">Nova Solicitação de Projeto</div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Seu Nome</label><input className="fi" placeholder="Arq. Nome Sobrenome" value={form.arch} onChange={upd('arch')}/></div>
            <div className="fg"><label className="fl">Escritório</label><input className="fi" placeholder="Nome do escritório" value={form.studio} onChange={upd('studio')}/></div>
          </div>
          <div className="fg-row">
            <div className="fg"><label className="fl">Nome do Projeto</label><input className="fi" placeholder="Ex: Res. Jardins — Varanda" value={form.project} onChange={upd('project')}/></div>
            <div className="fg"><label className="fl">Tipo de Ambiente</label>
              <select className="fi fi-sel" value={form.type} onChange={upd('type')}>
                {['residencial','comercial','corporativo','hoteleiro','externo'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div className="fg"><label className="fl">Área estimada (m2)</label><input className="fi" type="number" value={form.area} onChange={upd('area')}/></div>
          <div className="fg"><label className="fl">Briefing e Referências</label><textarea className="fi fi-ta" placeholder="Descreva o projeto, estilo, referências, condicionantes técnicas..." value={form.notes} onChange={upd('notes')} style={{minHeight:110}}/></div>
          <div className="upload-zone mb16"><div style={{fontSize:26,marginBottom:6}}>📐</div><div className="fw5 tsm">Enviar Arquivos do Projeto</div><div className="txs tmuted mt8">Plantas, DWG, PDF, fotos, renders</div></div>
          <button className="btn btn-p" onClick={()=>form.arch&&form.project&&form.notes&&setSubmitted(true)} disabled={!form.arch||!form.project||!form.notes}><Ico n="send" s={13}/>Enviar Solicitação</button>
        </div>
      ))}
    </div>
  );
}

/* ── OPERATIONS ── */
function OperationsPage() {
  const [sel, setSel] = useState<string|null>(null);
  const closed = OPPS.filter(o => o.stage==='Ganho');
  const opp = OPPS.find(o => o.id===sel);
  if (opp) {
    return (
      <div>
        <button className="btn btn-g mb16" onClick={()=>setSel(null)}><Ico n="arrow" s={14} style={{transform:'rotate(180deg)'}}/>Voltar</button>
        <div className="card cp mb16">
          <div className="flex-b mb16">
            <div><div className="fd" style={{fontSize:19,fontWeight:500}}>{opp.name}</div><div className="tsm tmuted mt8">{opp.client} · R$ {opp.value.toLocaleString('pt-BR')}</div></div>
            <span className="badge bm" style={{fontSize:12,padding:'5px 12px'}}>Pronto para Execução</span>
          </div>
          <div className="g4">
            {[['Cliente',opp.client],['Tipo',opp.type],['Valor','R$ '+opp.value.toLocaleString('pt-BR')],['Margem',opp.margin+'%']].map(([k,v])=>(
              <div key={k} style={{background:'var(--paper)',borderRadius:12,padding:12}}><div className="txs tmuted mb4">{k}</div><div className="fw5 tsm">{v}</div></div>
            ))}
          </div>
        </div>
        <div className="g2">
          <div className="card cp">
            <div className="ct mb12">Checklist de Handoff</div>
            {['Proposta assinada pelo cliente','50% de entrada recebido','Cronograma definido','Equipe técnica alocada','Pedidos realizados','Visita de medição agendada','Kit boas-vindas enviado'].map((item,i)=>(
              <div key={item} className="flex mb12" style={{gap:10}}>
                <div style={{width:17,height:17,borderRadius:4,background:i<4?'var(--moss)':'var(--paper-3)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {i<4 && <Ico n="check" s={10} style={{color:'#fff',strokeWidth:3}}/>}
                </div>
                <span className="tsm" style={{color:i<4?'var(--ink-2)':'var(--ink-4)'}}>{item}</span>
              </div>
            ))}
            <div className="mt12"><div className="flex-b mb4"><span className="txs tmuted">Progresso</span><span className="txs fw6">4/7</span></div><div className="progress"><div className="prog-fill" style={{width:'57%'}}/></div></div>
          </div>
          <div className="card cp">
            <div className="ct mb12">Cronograma</div>
            {['Medição técnica','Projeto executivo','Pedidos de materiais','Instalação / plantio','Entrega e treinamento'].map((f,i)=>(
              <div key={f} className="flex mb12" style={{gap:10}}>
                <div style={{width:21,height:21,borderRadius:'50%',background:i===0?'var(--moss)':i===1?'var(--gold)':'var(--paper-3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:i<2?'#fff':'var(--ink-4)',flexShrink:0}}>
                  {i===0 ? <Ico n="check" s={10} style={{strokeWidth:3}}/> : i+1}
                </div>
                <div style={{flex:1}}><div className="tsm fw5">{f}</div></div>
                <span className={`badge ${i===0?'bm':i===1?'bg':'bgy'}`} style={{fontSize:10}}>{i===0?'Concluído':i===1?'Em andamento':'Pendente'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex-b mb20"><div><h2 className="fd" style={{fontSize:21,color:'var(--ink)',fontWeight:500}}>Handoff Operacional</h2><div className="tsm tmuted mt8">Projetos aprovados prontos para execução</div></div></div>
      {closed.map(o=>(
        <div key={o.id} className="card cp mb12">
          <div className="flex-b mb12"><div><div className="fw6" style={{fontSize:14}}>{o.name}</div><div className="tsm tmuted mt8">{o.client} · {o.date}</div></div><span className="badge bm">Pronto p/ Execução</span></div>
          <div className="flex mb12" style={{gap:7,flexWrap:'wrap'}}>{o.products.map(p=><span key={p} className="chip">{p}</span>)}</div>
          <div className="flex" style={{gap:8}}><button className="btn btn-p btn-sm" onClick={()=>setSel(o.id)}><Ico n="arrow" s={12}/>Abrir Handoff</button><button className="btn btn-s btn-sm"><Ico n="download" s={12}/>Exportar</button></div>
        </div>
      ))}
    </div>
  );
}

/* ── NAV ── */
const NAV = [
  {id:'dashboard',label:'Dashboard',icon:'dashboard',section:'Principal'},
  {id:'briefing',label:'Novo Briefing',icon:'briefing',section:'Comercial'},
  {id:'pipeline',label:'Pipeline',icon:'pipeline',section:'Comercial',badge:OPPS.filter(o=>!['Ganho','Perdido'].includes(o.stage)).length},
  {id:'proposals',label:'Propostas',icon:'proposal',section:'Comercial'},
  {id:'crm',label:'CRM e Clientes',icon:'crm',section:'Relacionamento'},
  {id:'architects',label:'Portal Arquitetos',icon:'arch',section:'Relacionamento',badge:PARTNERS.filter(p=>p.status==='Aguardando docs').length},
  {id:'approvals',label:'Aprovações',icon:'approval',section:'Gestão',badge:APPROVALS.filter(a=>a.status==='pending').length,alert:true},
  {id:'operations',label:'Operações',icon:'ops',section:'Gestão'},
];
const SECS = [...new Set(NAV.map(n=>n.section))];

/* ── APP ── */
export default function App() {
  const [page, setPage] = useState('dashboard');
  const go = (p: string) => setPage(p);
  const cur = NAV.find(n=>n.id===page);
  const PAGES: Record<string,React.ReactNode> = {
    dashboard:<Dashboard go={go}/>,
    briefing:<BriefingPage/>,
    pipeline:<PipelinePage go={go}/>,
    proposals:<ProposalsPage/>,
    crm:<CRMPage/>,
    architects:<ArchitectPage/>,
    approvals:<ApprovalsPage/>,
    operations:<OperationsPage/>,
  };
  return (
    <>
      <style>{css}</style>
      <div className="shell">
        <nav className="sb" aria-label="Navegação principal">
          <div className="sb-brand">
            <div className="sb-logo">Mama <em>Flora</em></div>
            <div className="sb-tag">Commercial OS v3.0</div>
          </div>
          <div className="sb-sec">
            {SECS.map(sec=>(
              <div key={sec}>
                <div className="sb-sec-lbl">{sec}</div>
                {NAV.filter(n=>n.section===sec).map(n=>(
                  <button key={n.id} className={`sb-item ${page===n.id?'active':''}`} onClick={()=>go(n.id)} aria-current={page===n.id?'page':undefined}>
                    <Ico n={n.icon} s={14}/>
                    <span style={{flex:1}}>{n.label}</span>
                    {(n.badge||0)>0 && <span className={`sb-bdg ${n.alert?'alrt':'cnt'}`}>{n.badge}</span>}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="sb-footer">
            <div className="sb-user">
              <Avatar name="Daniela Matos" size={30}/>
              <div><div className="sb-uname">Daniela Matos</div><div className="sb-urole">Consultora Comercial</div></div>
            </div>
          </div>
        </nav>
        <main className="main">
          <header className="topbar">
            <div><div className="tb-bc">Mama Flora · Commercial OS</div><div className="tb-title">{cur?.label}</div></div>
            <div className="tb-actions">
              <button className="btn btn-g btn-ico btn-sm" aria-label="Buscar"><Ico n="search" s={14}/></button>
              <div style={{position:'relative'}}><button className="btn btn-g btn-ico btn-sm" aria-label="Notificações"><Ico n="bell" s={14}/></button><div className="notif" aria-hidden="true"/></div>
              <div style={{width:1,height:20,background:'var(--paper-3)'}}/>
              <button className="btn btn-p btn-sm" onClick={()=>go('briefing')}><Ico n="plus" s={13}/>Novo Briefing</button>
            </div>
          </header>
          <div className="content">{PAGES[page]||null}</div>
        </main>
      </div>
    </>
  );
}
