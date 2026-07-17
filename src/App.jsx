import React, { useState, useEffect, useRef, useCallback, useContext, createContext, useId } from "react";
import logoFullWhite from "./assets/brand/logo-full-white.png";
import {
  Mic, UserCheck, Route, CalendarClock, Repeat, TrendingUp,
  Star, Check, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ArrowUp,
  BookOpen, Feather, Baby,
  GraduationCap, Globe, Sparkles, Menu, X, Award, Quote,
  Instagram, Facebook, Youtube, Linkedin, Video, Clock,
  Mail, Phone, MapPin, Send, Users, Compass, Heart, MessageCircle,
  Calendar, Tag, ShieldCheck, Languages, Handshake, ArrowUpRight
} from "lucide-react";

/* ================================================================== *
 *  Speak in Urdu — multi-route site
 *  Routes (hash-based):  #/  ·  #/courses  ·  #/courses/<slug>  ·  #/pricing
 *  Shared design tokens live once in <Styles/>.
 * ================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;500;700&display=swap');

html,body{margin:0; padding:0;}
body{overflow-x:hidden;}
.mu-root *{box-sizing:border-box;}
.mu-root{
  --paper:#EEF3EA; --card:#FFFFFF;
  --emerald:#3F562E; --emerald-mid:#52713D; --emerald-tint:#E5EBE0;
  --gold:#7A5A43; --gold-soft:#C9A45A;
  --ink:#2F2F2F; --muted:#6B5F52; --border:#DCE6D6;
  --rc:18px; --rb:12px;
  --sh-sm:0 1px 2px rgba(47,47,47,.05), 0 6px 16px -8px rgba(47,47,47,.12);
  --sh-md:0 2px 6px rgba(47,47,47,.06), 0 22px 48px -18px rgba(47,47,47,.22);
  --maxw:1200px;
  background:var(--paper); color:var(--ink);
  font-family:"Manrope",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
  font-size:17px; line-height:1.62; -webkit-font-smoothing:antialiased;
  letter-spacing:-0.003em;
}
.mu-root h1,.mu-root h2,.mu-root h3,.mu-root h4{
  font-family:"Plus Jakarta Sans","Manrope",sans-serif;
  color:var(--ink); line-height:1.1; margin:0; letter-spacing:-0.02em;
}
.mu-root p{margin:0;}
.mu-root a{color:inherit; text-decoration:none;}
.mu-root [id]{scroll-margin-top:88px;}
.mu-urdu{font-family:"Noto Nastaliq Urdu",serif; line-height:2;}
.mu-sr{position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap;}

.mu-wrap{max-width:var(--maxw); margin:0 auto; padding:0 24px;}
.mu-section{padding:88px 0;}
.mu-eyebrow{display:inline-flex; align-items:center; gap:8px; font-size:12.5px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--emerald);}
.mu-eyebrow::before{content:""; width:22px; height:1.5px; background:var(--gold); display:inline-block;}
.mu-h2{font-size:clamp(28px,4.4vw,44px); font-weight:800;}
.mu-lead{color:var(--muted); font-size:clamp(16px,2vw,18px); max-width:56ch; margin-top:14px;}
.mu-center{text-align:center; margin:0 auto;}
.mu-center .mu-lead{margin-left:auto; margin-right:auto;}

/* buttons */
.mu-btn{display:inline-flex; align-items:center; justify-content:center; gap:9px; font-weight:600; font-size:15.5px; cursor:pointer; border:1px solid transparent; font-family:inherit; transition:background .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease, border-color .2s ease; white-space:nowrap;}
.mu-btn-lg{padding:15px 26px; border-radius:999px;}
.mu-btn-md{padding:11px 20px; border-radius:var(--rb);}
.mu-btn-primary{background:var(--emerald); color:#fff; box-shadow:var(--sh-sm);}
.mu-btn-primary:hover{background:var(--emerald-mid); transform:translateY(-1px); box-shadow:var(--sh-md);}
.mu-btn-ghost{background:#fff; color:var(--ink); border-color:var(--border);}
.mu-btn-ghost:hover{border-color:var(--emerald); color:var(--emerald); transform:translateY(-1px);}
.mu-btn-block{width:100%;}
.mu-btn-gold{background:var(--gold-soft); color:#2F2F2F;}
.mu-btn-gold:hover{background:#d8b43a; transform:translateY(-1px);}
.mu-root :focus-visible{outline:2.5px solid var(--emerald); outline-offset:3px; border-radius:6px;}
.mu-on-dark :focus-visible{outline-color:var(--gold-soft);}

.mu-linkbtn{background:none; border:0; padding:0; margin:0; font:inherit; cursor:pointer; color:inherit; text-align:left;}
.mu-textlink{display:inline-flex; align-items:center; gap:6px; color:var(--emerald); font-weight:600; font-size:14.5px; background:none; border:0; cursor:pointer; padding:0; font-family:inherit;}
.mu-textlink:hover{color:var(--emerald-mid);}

/* reveal */
.mu-reveal{opacity:0; transform:translateY(20px); transition:opacity .6s ease, transform .6s cubic-bezier(.2,.75,.2,1);}
.mu-reveal.is-in{opacity:1; transform:none;}

/* pattern */
.mu-pattern{position:absolute; inset:0; width:100%; height:100%; color:var(--emerald); opacity:.05; pointer-events:none;}

/* ---------- header ---------- */
.mu-header{position:sticky; top:0; z-index:60; background:var(--emerald); border-bottom:1px solid transparent; transition:box-shadow .25s ease;}
.mu-header.is-stuck{box-shadow:0 8px 24px -20px rgba(20,40,32,.55);}
.mu-nav{display:flex; align-items:center; justify-content:space-between; height:72px; gap:20px; color:#fff;}
.mu-brand{display:flex; align-items:center; gap:9px; font-family:"Plus Jakarta Sans"; font-weight:800; font-size:19px; letter-spacing:-0.02em; background:none; border:0; cursor:pointer; color:inherit;}
.mu-brand-full{display:block; flex-shrink:0; object-fit:contain;}
.mu-navlinks{display:none; align-items:center; gap:26px;}
.mu-navlinks button{font-family:inherit; background:none; border:0; cursor:pointer; font-size:14.5px; font-weight:500; color:rgba(255,255,255,.72); position:relative; padding:6px 0; transition:color .2s;}
.mu-navlinks button:hover{color:#fff;}
.mu-navlinks button::after{content:""; position:absolute; left:0; bottom:0; height:2px; width:0; background:var(--gold-soft); transition:width .25s ease;}
.mu-navlinks button:hover::after, .mu-navlinks button.active::after{width:100%;}
.mu-navlinks button.active{color:#fff;}
.mu-navright{display:flex; align-items:center; gap:14px;}
.mu-burger{display:inline-flex; background:rgba(255,255,255,.14); border:1px solid rgba(255,255,255,.28); border-radius:12px; padding:9px; cursor:pointer; color:#fff;}
.mu-mobile{display:none; border-top:1px solid rgba(255,255,255,.16); background:var(--emerald); padding:14px 0 20px;}
.mu-mobile.open{display:block;}
.mu-mobile button.ml{display:block; width:100%; text-align:left; background:none; border:0; border-bottom:1px solid rgba(255,255,255,.16); font:inherit; font-weight:500; color:rgba(255,255,255,.85); padding:12px 4px; cursor:pointer; transition:color .15s ease;}
.mu-mobile button.ml:hover{color:#fff;}
.mu-mobile .mu-btn{margin-top:16px;}
.mu-desktop-cta{display:none;}

/* ---------- hero ---------- */
.mu-hero{position:relative; overflow:hidden;}
.mu-hero-inner{display:grid; grid-template-columns:1fr; gap:44px; align-items:center; padding:56px 0 84px;}
.mu-hero h1{font-size:clamp(34px,6.2vw,60px); font-weight:800; margin-top:20px; max-width:14ch;}
.mu-hero .mu-lead{margin-top:20px; font-size:clamp(17px,2.2vw,20px); max-width:50ch;}
.mu-hero-ctas{display:flex; flex-wrap:wrap; gap:14px; margin-top:30px;}
.mu-trustrow{display:flex; flex-wrap:wrap; align-items:center; gap:8px 18px; margin-top:34px; padding-top:26px; border-top:1px solid var(--border); color:var(--muted); font-size:14.5px; font-weight:500;}
.mu-trustrow .dot{width:4px; height:4px; border-radius:50%; background:var(--border);}
.mu-stars{display:inline-flex; gap:2px; color:var(--gold);}
.mu-stars svg{fill:var(--gold);}
.mu-visual{position:relative; min-height:420px;}
.mu-visual-urdu{position:absolute; right:-6px; top:-30px; font-size:150px; color:var(--emerald); opacity:.07; user-select:none; pointer-events:none;}
.mu-vcard{position:relative; background:var(--card); border:1px solid var(--border); border-radius:22px; box-shadow:var(--sh-md); padding:24px; max-width:400px; margin-left:auto;}
.mu-vcard .row1{display:flex; align-items:center; justify-content:space-between; margin-bottom:18px;}
.mu-live{display:inline-flex; align-items:center; gap:8px; font-size:12.5px; font-weight:600; color:var(--emerald); background:var(--emerald-tint); padding:6px 12px; border-radius:999px;}
.mu-live .pulse{width:8px; height:8px; border-radius:50%; background:var(--emerald); position:relative;}
.mu-live .pulse::after{content:""; position:absolute; inset:-4px; border-radius:50%; border:2px solid var(--emerald); animation:mu-ping 1.8s ease-out infinite;}
.mu-vcard .label{font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); font-weight:600;}
.mu-letters{display:flex; gap:10px; margin:14px 0 20px; justify-content:space-between;}
.mu-letter{flex:1; aspect-ratio:1; background:var(--paper); border:1px solid var(--border); border-radius:14px; display:flex; align-items:center; justify-content:center; font-family:"Noto Nastaliq Urdu"; font-size:30px; color:var(--emerald); padding-bottom:6px;}
.mu-letter.hot{background:var(--emerald); color:#fff; border-color:var(--emerald);}
.mu-prog{height:8px; border-radius:999px; background:var(--emerald-tint); overflow:hidden;}
.mu-prog span{display:block; height:100%; width:68%; background:linear-gradient(90deg,var(--emerald),var(--emerald-mid)); border-radius:999px;}
.mu-vcard .progmeta{display:flex; justify-content:space-between; font-size:13px; color:var(--muted); margin-top:10px;}
.mu-chip{position:absolute; background:var(--card); border:1px solid var(--border); border-radius:16px; box-shadow:var(--sh-md); padding:12px 16px;}
.mu-chip.rating{left:-8px; bottom:36px; display:flex; align-items:center; gap:10px;}
.mu-chip.rating .big{font-family:"Plus Jakarta Sans"; font-weight:800; font-size:22px;}
.mu-chip.wk{right:-6px; top:66px; display:none;}
.mu-chip.wk .t{font-size:12px; color:var(--muted); font-weight:600;}
.mu-chip.wk .v{font-family:"Plus Jakarta Sans"; font-weight:700; font-size:15px; display:flex; align-items:center; gap:6px; color:var(--emerald);}

/* ---------- trust bar ---------- */
.mu-trustbar{border-top:1px solid var(--border); border-bottom:1px solid var(--border); background:var(--card);}
.mu-trustbar .grid{display:grid; grid-template-columns:repeat(2,1fr); gap:0;}
.mu-stat{padding:30px 20px; text-align:center; border-right:1px solid var(--border); border-bottom:1px solid var(--border);}
.mu-stat:nth-child(2n){border-right:0;}
.mu-stat:nth-last-child(-n+2){border-bottom:0;}
.mu-stat .n{font-family:"Plus Jakarta Sans"; font-weight:800; font-size:clamp(26px,3.4vw,34px); color:var(--emerald);}
.mu-stat .l{color:var(--muted); font-size:14px; font-weight:500; margin-top:4px;}

/* ---------- generic card grids ---------- */
.mu-grid{display:grid; grid-template-columns:1fr; gap:20px; margin-top:44px;}
.mu-card{background:var(--card); border:1px solid var(--border); border-radius:var(--rc); padding:26px; box-shadow:var(--sh-sm); transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease; height:100%;}
.mu-card:hover{transform:translateY(-4px); box-shadow:var(--sh-md); border-color:#dcd6c9;}
.mu-ico{width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; background:var(--emerald-tint); color:var(--emerald); margin-bottom:16px;}
.mu-card h3{font-size:19px; font-weight:700; margin-bottom:8px;}
.mu-card p{color:var(--muted); font-size:15.5px;}

/* course card */
.mu-course{display:flex; flex-direction:column;}
.mu-course .top{display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px;}
.mu-meta{font-size:12.5px; color:var(--muted); font-weight:600; letter-spacing:.02em;}
.mu-course h3{font-size:20px;}
.mu-course .desc{margin:8px 0 14px;}
.mu-featlabel{font-size:11.5px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); margin-bottom:9px;}
.mu-bullets{list-style:none; padding:0; margin:0 0 20px; display:grid; gap:9px;}
.mu-bullets li{display:flex; gap:9px; align-items:flex-start; font-size:14.5px; color:var(--ink);}
.mu-bullets svg{color:var(--emerald); flex-shrink:0; margin-top:3px;}
.mu-course .foot{margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:16px; border-top:1px solid var(--border);}
.mu-course .links{display:flex; align-items:center; gap:14px;}
.mu-price{font-family:"Plus Jakarta Sans"; font-weight:800; font-size:20px;}
.mu-price small{font-family:"Manrope"; font-weight:600; font-size:12.5px; color:var(--muted); letter-spacing:.04em; text-transform:uppercase; display:block; margin-bottom:-2px;}

/* ---------- how it works ---------- */
.mu-steps{position:relative; margin-top:48px; display:grid; grid-template-columns:1fr; gap:22px;}
.mu-step{position:relative; padding-left:60px;}
.mu-step .num{position:absolute; left:0; top:0; width:44px; height:44px; border-radius:50%; background:var(--card); border:1.5px solid var(--emerald); color:var(--emerald); display:flex; align-items:center; justify-content:center; font-family:"Plus Jakarta Sans"; font-weight:800; box-shadow:var(--sh-sm);}
.mu-step h3{font-size:17px; margin-bottom:5px;}
.mu-step p{color:var(--muted); font-size:14.5px;}

.mu-avatar{width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:"Plus Jakarta Sans"; font-weight:800; font-size:22px; color:#fff; background:linear-gradient(135deg,var(--emerald),var(--emerald-mid)); box-shadow:0 6px 16px -8px rgba(63,86,46,.6); position:relative;}
.mu-avatar::after{content:""; position:absolute; inset:-4px; border-radius:50%; border:1.5px solid var(--gold-soft);}

/* ---------- testimonials ---------- */
.mu-testi{position:relative; overflow:hidden;}
.mu-testi-track-wrap{overflow:hidden;}
.mu-testi-track{display:flex; transition:transform .55s cubic-bezier(.22,.72,.2,1);}
.mu-testi-slide{min-width:100%; padding:8px;}
.mu-quotecard{background:var(--card); border:1px solid var(--border); border-radius:22px; box-shadow:var(--sh-sm); padding:38px 34px; max-width:760px; margin:0 auto; text-align:center; position:relative;}
.mu-quotecard .qmark{color:var(--gold); opacity:.5; margin:0 auto 10px;}
.mu-quotecard blockquote{font-family:"Plus Jakarta Sans"; font-weight:600; font-size:clamp(19px,2.6vw,25px); line-height:1.4; letter-spacing:-0.01em; margin:0;}
.mu-quotecard cite{display:block; margin-top:18px; font-style:normal; color:var(--muted); font-weight:600; font-size:14.5px;}
.mu-testi-controls{display:flex; align-items:center; justify-content:center; gap:18px; margin-top:26px;}
.mu-arrow{width:44px; height:44px; border-radius:50%; background:var(--card); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink); transition:all .2s;}
.mu-arrow:hover{border-color:var(--emerald); color:var(--emerald);}
.mu-dots{display:flex; gap:8px;}
.mu-dot{width:9px; height:9px; border-radius:50%; background:var(--border); border:0; padding:0; cursor:pointer; transition:all .25s;}
.mu-dot.on{background:var(--gold); width:26px; border-radius:999px;}

/* ---------- pricing cards ---------- */
.mu-pricing-grid{display:grid; grid-template-columns:1fr; gap:22px; margin-top:40px; align-items:stretch;}
.mu-plan{background:var(--card); border:1px solid var(--border); border-radius:20px; padding:30px 26px; box-shadow:var(--sh-sm); display:flex; flex-direction:column; position:relative;}
.mu-plan.pop{border-color:var(--emerald); box-shadow:var(--sh-md);}
.mu-popbadge{position:absolute; top:-13px; left:50%; transform:translateX(-50%); background:var(--gold-soft); color:#2F2F2F; font-size:12px; font-weight:800; letter-spacing:.08em; text-transform:uppercase; padding:6px 16px; border-radius:999px; display:inline-flex; align-items:center; gap:6px;}
.mu-plan h3{font-size:20px; margin-bottom:4px;}
.mu-plan .tagline{color:var(--muted); font-size:14.5px; min-height:22px;}
.mu-planprice{font-family:"Plus Jakarta Sans"; font-weight:800; font-size:42px; margin:16px 0 2px; display:flex; align-items:baseline; gap:4px;}
.mu-planprice small{font-size:16px; font-weight:600; color:var(--muted);}
.mu-annnote{font-size:13px; color:var(--muted); min-height:20px; margin-bottom:6px;}
.mu-annnote .save{color:var(--emerald); font-weight:700;}
.mu-plan .incl{list-style:none; padding:0; margin:16px 0 26px; display:grid; gap:11px;}
.mu-plan .incl li{display:flex; gap:10px; font-size:14.5px; align-items:flex-start;}
.mu-plan .incl svg{color:var(--emerald); flex-shrink:0; margin-top:3px;}
.mu-plan .btnwrap{margin-top:auto;}
.mu-plan .subnote{text-align:center; font-size:12.5px; color:var(--muted); margin-top:12px;}

/* ---------- faq ---------- */
.mu-faq{max-width:820px; margin:44px auto 0;}
.mu-faq-item{border-bottom:1px solid var(--border);}
.mu-faq-q{width:100%; background:transparent; border:0; cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:20px; padding:22px 4px; text-align:left; font-family:"Plus Jakarta Sans"; font-weight:700; font-size:17.5px; color:var(--ink);}
.mu-faq-q .ic{flex-shrink:0; width:32px; height:32px; border-radius:50%; background:var(--emerald-tint); color:var(--emerald); display:flex; align-items:center; justify-content:center; transition:transform .3s ease;}
.mu-faq-q[aria-expanded="true"] .ic{transform:rotate(180deg);}
.mu-faq-a{overflow:hidden; max-height:0; transition:max-height .35s ease;}
.mu-faq-a .inner{padding:0 4px 22px; color:var(--muted); font-size:15.5px; max-width:70ch;}

/* ---------- final cta ---------- */
.mu-final{position:relative; overflow:hidden; background:var(--emerald); color:#fff; border-radius:28px; margin:0 auto; padding:64px 32px; text-align:center;}
.mu-final .mu-pattern{color:#fff; opacity:.08;}
.mu-final h2{color:#fff; font-size:clamp(26px,4vw,40px); font-weight:800; max-width:18ch; margin:0 auto; position:relative;}
.mu-final p{color:rgba(255,255,255,.85); margin:16px auto 30px; max-width:44ch; position:relative;}
.mu-final .flourish{font-family:"Noto Nastaliq Urdu"; color:var(--gold-soft); font-size:34px; opacity:.9; margin-bottom:6px; position:relative;}

/* ---------- footer ---------- */
.mu-footer{position:relative; overflow:hidden; background:#2F2F2F; color:#EAE3D3; margin-top:96px; padding:64px 0 32px;}
.mu-footer .mu-pattern{color:#fff; opacity:.04;}
.mu-footcols{display:grid; grid-template-columns:1fr; gap:36px; position:relative;}
.mu-footbrand .mu-brand{color:#fff;}
.mu-footbrand p{color:#C9C0AE; font-size:14.5px; margin-top:12px; max-width:34ch;}
.mu-footcol h4{color:#fff; font-size:13px; letter-spacing:.1em; text-transform:uppercase; margin-bottom:16px; font-family:"Plus Jakarta Sans";}
.mu-footcol button.fl{display:block; background:none; border:0; cursor:pointer; font:inherit; text-align:left; color:#C9C0AE; font-size:14.5px; padding:6px 0; transition:color .2s;}
.mu-footcol button.fl:hover{color:var(--gold-soft);}
.mu-news{display:flex; gap:8px; margin-top:14px;}
.mu-news input{flex:1; background:#262523; border:1px solid #4A473F; border-radius:12px; padding:11px 14px; color:#fff; font:inherit; font-size:14.5px;}
.mu-news input::placeholder{color:#A69C89;}
.mu-news input:focus{outline:2px solid var(--gold-soft); outline-offset:1px;}
.mu-socials{display:flex; gap:10px; margin-top:18px;}
.mu-socials a{width:38px; height:38px; border-radius:10px; border:1px solid #4A473F; display:flex; align-items:center; justify-content:center; color:#D6CDBA; transition:all .2s;}
.mu-socials a:hover{background:var(--gold-soft); color:#2F2F2F; border-color:var(--gold-soft);}
.mu-footbottom{position:relative; border-top:1px solid #3D3B36; margin-top:44px; padding-top:24px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; color:#A69C89; font-size:13.5px;}
.mu-footbottom .mu-urdu{color:var(--gold-soft); font-size:22px; opacity:.85;}

/* ---------- page hero + breadcrumb ---------- */
.mu-pagehero{position:relative; overflow:hidden; border-bottom:1px solid var(--border);}
.mu-pagehero .mu-wrap{padding-top:54px; padding-bottom:54px; position:relative;}
.mu-crumb{display:flex; align-items:center; gap:8px; font-size:13.5px; color:var(--muted); font-weight:500; margin-bottom:18px; flex-wrap:wrap;}
.mu-crumb button{background:none; border:0; padding:0; font:inherit; color:var(--muted); cursor:pointer;}
.mu-crumb button:hover{color:var(--emerald);}
.mu-crumb .sep{color:var(--border);}
.mu-crumb .cur{color:var(--ink); font-weight:600;}

/* ---------- course detail ---------- */
.mu-detail-grid{display:grid; grid-template-columns:1fr; gap:34px; margin-top:8px;}
.mu-detail-main > * + *{margin-top:40px;}
.mu-detail-head .chips{display:flex; flex-wrap:wrap; gap:8px; margin:16px 0 4px;}
.mu-chiptag{display:inline-flex; align-items:center; gap:7px; font-size:12.5px; font-weight:600; color:var(--emerald); background:var(--emerald-tint); padding:7px 13px; border-radius:999px;}
.mu-block h2{font-size:24px; font-weight:800; margin-bottom:6px;}
.mu-block .sub{color:var(--muted); margin-bottom:20px;}
.mu-outcomes{list-style:none; padding:0; margin:0; display:grid; gap:13px;}
.mu-outcomes li{display:flex; gap:12px; align-items:flex-start; font-size:16px;}
.mu-outcomes svg{color:var(--emerald); flex-shrink:0; margin-top:4px;}
.mu-detail-side .card{background:var(--card); border:1px solid var(--border); border-radius:20px; padding:24px; box-shadow:var(--sh-md);}
.mu-detail-side .price{font-family:"Plus Jakarta Sans"; font-weight:800; font-size:34px; display:flex; align-items:baseline; gap:5px;}
.mu-detail-side .price small{font-size:14px; font-weight:600; color:var(--muted);}
.mu-detail-side .price .from{font-size:11.5px; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); font-weight:700; display:block; margin-bottom:-2px;}
.mu-tierlist{list-style:none; padding:0; margin:16px 0 0; display:grid; gap:0; border-top:1px solid var(--border);}
.mu-tierlist li{display:flex; align-items:center; justify-content:space-between; gap:12px; font-size:14px; padding:9px 0; border-bottom:1px solid var(--border); color:var(--muted);}
.mu-tierlist li b{color:var(--ink); font-weight:700;}
.mu-facts{list-style:none; padding:0; margin:20px 0; display:grid; gap:0;}
.mu-facts li{display:flex; align-items:center; justify-content:space-between; gap:12px; font-size:14.5px; padding:11px 0; border-bottom:1px solid var(--border);}
.mu-facts li:last-child{border-bottom:0;}
.mu-facts .k{color:var(--muted); display:inline-flex; align-items:center; gap:8px;}
.mu-facts .v{font-weight:600; text-align:right;}
.mu-side-cta{display:grid; gap:10px; margin-top:6px;}

/* ---------- pricing page ---------- */
.mu-billing{display:flex; flex-direction:column; align-items:center; gap:10px; margin-top:26px;}
.mu-billing-toggle{display:inline-flex; align-items:center; background:var(--card); border:1px solid var(--border); border-radius:999px; padding:5px;}
.mu-billing-toggle button{border:0; background:transparent; padding:9px 18px; border-radius:999px; cursor:pointer; font:inherit; font-weight:600; font-size:14.5px; color:var(--muted); display:inline-flex; align-items:center; gap:8px;}
.mu-billing-toggle button.on{background:var(--emerald); color:#fff;}
.mu-billing-label{font-size:13px; font-weight:600; letter-spacing:.02em; color:var(--muted);}
.mu-fromlbl{font-size:15px; font-weight:600; color:var(--muted);}
.mu-currency{font-size:.5em; font-weight:600; color:var(--muted); letter-spacing:.02em;}
.mu-save-badge{font-size:11px; font-weight:800; letter-spacing:.03em; color:#2F2F2F; background:var(--gold-soft); padding:3px 8px; border-radius:999px;}

/* ---------- payment page ---------- */
.mu-paymethods{display:flex; flex-wrap:wrap; gap:10px; margin-bottom:32px;}
.mu-paymethods button{border:1px solid var(--border); background:var(--card); color:var(--ink); border-radius:999px; padding:10px 20px; font-size:14.5px; font-weight:700; cursor:pointer; transition:all .18s ease;}
.mu-paymethods button:hover{border-color:var(--emerald); color:var(--emerald);}
.mu-paymethods button.on{background:var(--emerald); border-color:var(--emerald); color:#fff;}
.mu-paycard{background:var(--card); border:1px solid var(--border); border-radius:var(--rc); padding:34px; box-shadow:var(--sh-sm);}
.mu-paycard h2{font-size:24px;}
.mu-paycard .tagline{color:var(--emerald); font-weight:600; font-size:14px; margin-top:6px;}
.mu-paycard .about{color:var(--muted); margin-top:12px; max-width:64ch; line-height:1.6;}
.mu-paysteps{display:flex; flex-direction:column; gap:0; margin-top:28px; border-top:1px solid var(--border);}
.mu-paystep{display:flex; gap:16px; align-items:flex-start; padding:16px 0; border-bottom:1px solid var(--border);}
.mu-paystep .num{flex:0 0 auto; width:30px; height:30px; border-radius:50%; background:var(--emerald-tint); color:var(--emerald); display:flex; align-items:center; justify-content:center; font-family:"Plus Jakarta Sans"; font-weight:800; font-size:13.5px;}
.mu-paystep p{margin:0; padding-top:4px; font-size:15px; line-height:1.55;}
.mu-paytips{margin-top:28px; background:var(--paper); border-radius:14px; padding:20px 22px;}
.mu-paytips h3{font-size:15px; margin-bottom:12px;}
.mu-paytips ul{list-style:none; padding:0; margin:0; display:grid; gap:9px;}
.mu-paytips li{display:flex; gap:9px; align-items:flex-start; font-size:14px; color:var(--muted);}
.mu-paytips li svg{color:var(--emerald); flex-shrink:0; margin-top:2px;}
.mu-paynote{display:flex; gap:16px; align-items:flex-start; background:var(--emerald-tint); border-radius:var(--rc); padding:26px 28px; margin-top:24px;}
.mu-paynote svg{color:var(--emerald); flex-shrink:0; margin-top:2px;}
.mu-paynote h3{font-size:16.5px;}
.mu-paynote p{color:var(--muted); margin-top:6px; max-width:60ch; line-height:1.55;}
.mu-paynote .btns{display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;}

.mu-paybanner{display:flex; align-items:center; gap:16px; width:100%; text-align:left; background:linear-gradient(135deg, var(--emerald), var(--emerald-mid)); color:#fff; border:0; border-radius:var(--rc); padding:18px 24px; margin:28px 0 0; cursor:pointer; transition:transform .18s ease, box-shadow .18s ease; box-shadow:0 10px 30px -14px rgba(63,86,46,.55);}
.mu-paybanner:hover{transform:translateY(-2px); box-shadow:0 16px 36px -14px rgba(63,86,46,.6);}
.mu-paybanner-icon{flex:0 0 auto; width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.16); display:flex; align-items:center; justify-content:center;}
.mu-paybanner-text{display:flex; flex-direction:column; gap:2px; flex:1; min-width:0;}
.mu-paybanner-text strong{font-family:"Plus Jakarta Sans"; font-size:16px;}
.mu-paybanner-text span{color:rgba(255,255,255,.85); font-size:13.5px; line-height:1.4;}
.mu-paybanner-cta{flex:0 0 auto; display:flex; align-items:center; gap:6px; font-weight:700; font-size:14px; background:rgba(255,255,255,.14); padding:9px 16px; border-radius:999px; white-space:nowrap;}
@media (max-width:640px){
  .mu-paybanner{flex-wrap:wrap;}
  .mu-paybanner-text{order:2; width:100%;}
  .mu-paybanner-cta{order:3; width:100%; justify-content:center;}
}


/* star pop */
.mu-anim-star{animation:mu-pop .5s cubic-bezier(.2,1.4,.4,1) both;}
@keyframes mu-ping{0%{transform:scale(1);opacity:.7;}70%,100%{transform:scale(2.2);opacity:0;}}
@keyframes mu-pop{0%{transform:scale(.4);opacity:0;}100%{transform:scale(1);opacity:1;}}


/* ---------- shared: photos ---------- */
.mu-photo{position:relative; overflow:hidden; border-radius:var(--rc); background:linear-gradient(135deg,var(--emerald),var(--emerald-mid)); isolation:isolate;}
.mu-photo img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity .6s ease; z-index:2;}
.mu-photo.is-ok img{opacity:1;}
.mu-art{position:absolute; inset:0; z-index:1; display:block;}
.mu-art svg{position:absolute; inset:0; width:100%; height:100%; display:block;}
.mu-art-word{position:absolute; left:50%; top:50%; transform:translate(-50%,-54%); color:rgba(255,255,255,.96); font-size:clamp(28px,5.5vw,50px); line-height:2; white-space:nowrap; text-align:center; text-shadow:0 2px 16px rgba(0,0,0,.22);}
.mu-art-word::after{content:""; display:block; width:42px; height:3px; background:var(--gold); border-radius:2px; margin:0 auto;}
.mu-art-ico{position:absolute; left:14px; bottom:12px; width:30px; height:30px; border-radius:9px; background:rgba(255,255,255,.16); color:#fff; display:grid; place-items:center; backdrop-filter:blur(4px);}
.mu-visual-photo .mu-art-word{font-size:44px;}
.mu-detail-banner .mu-art-word,.mu-post-banner .mu-art-word{font-size:clamp(30px,4vw,46px);}
.mu-course-media .mu-art-word,.mu-postcard-media .mu-art-word{font-size:32px;}
.mu-contact-photo .mu-art-word{font-size:34px;}
.mu-skip{position:fixed; top:-100px; left:16px; z-index:200; background:var(--emerald); color:#fff; font-weight:700; font-size:14px; padding:10px 18px; border-radius:999px; box-shadow:var(--sh-md); transition:top .15s ease;}
.mu-skip:focus{top:14px; outline:2px solid var(--gold); outline-offset:2px;}
#main-content:focus{outline:none;}
.mu-photo-ov{position:absolute; inset:0; z-index:3; pointer-events:none; background:linear-gradient(180deg,transparent 42%,rgba(47,47,47,.5));}

.mu-visual-photo{display:none; position:absolute; top:6px; right:-4px; width:300px; transform:rotate(3deg); box-shadow:var(--sh-md); z-index:1;}
.mu-visual .mu-vcard{z-index:2;}
.mu-visual .mu-chip{z-index:2;}

.mu-course{overflow:hidden;}
.mu-course-media{margin:-26px -26px 20px; border-radius:0;}
.mu-detail-banner{box-shadow:var(--sh-md); min-height:180px;}
.mu-post-banner{margin-bottom:28px; min-height:150px;}

/* ---------- shared: small bits ---------- */
.mu-h3{font-family:"Plus Jakarta Sans",sans-serif; font-weight:700; font-size:20px; line-height:1.3;}
.mu-narrow{max-width:780px;}
.mu-avatar.tiny{width:28px; height:28px; font-size:11px; border-radius:9px;}
.mu-avatar.tiny::after{border-radius:11px; inset:-3px;}

/* ---------- about ---------- */
.mu-about-split{display:grid; gap:44px; align-items:start;}
.mu-about-stats{display:flex; flex-wrap:wrap; gap:14px 34px; margin-top:26px; padding-top:22px; border-top:1px solid var(--border);}
.mu-about-stats .stat .n{display:block; font-family:"Plus Jakarta Sans"; font-weight:800; font-size:26px; color:var(--emerald);}
.mu-about-stats .stat .l{font-size:13px; color:var(--muted);}
.mu-about-timeline{display:flex; flex-direction:column; gap:0;}
.mu-mile{display:flex; gap:18px; padding:18px 0; border-bottom:1px solid var(--border);}
.mu-mile:last-child{border-bottom:0;}
.mu-mile .yr{flex:0 0 auto; font-family:"Plus Jakarta Sans"; font-weight:800; color:var(--emerald); background:var(--emerald-tint); border-radius:10px; padding:6px 12px; height:fit-content; font-size:14px;}
.mu-mile h3{font-size:16px; margin-bottom:4px;}
.mu-mile p{font-size:14px; color:var(--muted);}
.mu-teamcard{text-align:center; display:flex; flex-direction:column; align-items:center;}
.mu-teamcard .mu-avatar{margin-bottom:14px;}
.mu-teamcard .role{display:block; font-size:13px; color:var(--emerald); font-weight:600; margin:2px 0 10px;}
.mu-teamcard p{font-size:14px; color:var(--muted);}

/* ---------- filters (teachers + blog) ---------- */
.mu-filterbar{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
.mu-filterchip{border:1px solid var(--border); background:var(--card); color:var(--ink); border-radius:999px; padding:8px 16px; font-size:14px; font-weight:600; cursor:pointer; transition:all .18s ease;}
.mu-filterchip:hover{border-color:var(--emerald); color:var(--emerald);}
.mu-filterchip.on{background:var(--emerald); border-color:var(--emerald); color:#fff;}
.mu-resultcount{margin-top:16px; font-size:13px; color:var(--muted);}

/* ---------- blog ---------- */
.mu-catpill{display:inline-flex; align-items:center; gap:6px; background:var(--emerald-tint); color:var(--emerald); border-radius:999px; padding:6px 12px; font-size:13px; font-weight:700; width:fit-content;}
.mu-catpill.sm{padding:4px 10px; font-size:12px;}
.mu-postmeta{display:flex; align-items:center; gap:9px; font-size:13px; color:var(--muted); margin-top:14px;}
.mu-postmeta .dot{width:3px; height:3px; border-radius:50%; background:var(--muted); display:inline-block;}
.mu-feature{display:grid; text-align:left; width:100%; border:1px solid var(--border); background:var(--card); border-radius:var(--rc); box-shadow:var(--sh-sm); overflow:hidden; cursor:pointer; padding:0; transition:transform .25s ease, box-shadow .25s ease;}
.mu-feature:hover{transform:translateY(-4px); box-shadow:var(--sh-md);}
.mu-feature-body{padding:30px; display:flex; flex-direction:column; align-items:flex-start; gap:12px;}
.mu-feature-body h2{font-size:clamp(22px,3vw,30px);}
.mu-feature-body p{color:var(--muted);}
.mu-feature-art{position:relative; min-height:220px; background:linear-gradient(135deg,var(--emerald),var(--emerald-mid));}
.mu-feature-art .mu-photo{position:absolute; inset:0; height:100%; border-radius:0;}
.mu-postcard{text-align:left; cursor:pointer; padding:0; overflow:hidden; display:flex; flex-direction:column;}
.mu-postcard-media{border-radius:0; flex:0 0 auto;}
.mu-postcard-body{padding:22px 26px 26px; display:flex; flex-direction:column; align-items:flex-start; gap:10px; flex:1;}
.mu-postcard-body h3{font-size:18px; line-height:1.35;}
.mu-postcard-body p{font-size:14px; color:var(--muted);}
.mu-postcard-body .mu-textlink{margin-top:auto; padding-top:6px;}
.mu-posthero{padding-bottom:34px;}
.mu-article-lead{font-size:clamp(17px,2.2vw,20px); color:var(--muted); line-height:1.7; margin-bottom:26px;}
.mu-article h2{font-size:clamp(20px,2.6vw,26px); margin:36px 0 12px;}
.mu-article p{line-height:1.8; margin-bottom:16px; color:#2b3833;}
.mu-article ul{margin:0 0 18px 20px; display:flex; flex-direction:column; gap:8px;}
.mu-article li{line-height:1.65; color:#2b3833;}
.mu-callout{display:flex; gap:14px; background:var(--emerald-tint); border:1px solid #d8e8e0; border-radius:14px; padding:18px 20px; margin:24px 0;}
.mu-callout .ic{flex:0 0 auto; color:var(--emerald); margin-top:2px;}
.mu-callout p{margin:0; font-size:15px;}
.mu-urduex{background:var(--card); border:1px solid var(--border); border-radius:14px; padding:20px 22px; margin:24px 0; box-shadow:var(--sh-sm);}
.mu-urduex .ur{display:block; direction:rtl; font-size:26px; line-height:2; color:var(--emerald); margin-bottom:6px;}
.mu-urduex .tr{display:block; font-style:italic; color:var(--ink); font-weight:600; margin-bottom:2px;}
.mu-urduex .en{display:block; font-size:14px; color:var(--muted);}
.mu-verse{border-left:3px solid var(--gold); background:var(--card); border-radius:0 14px 14px 0; padding:22px 24px; margin:26px 0;}
.mu-verse .ur{display:block; direction:rtl; font-size:22px; line-height:2.2; color:var(--ink);}
.mu-verse cite{display:block; margin-top:10px; font-style:normal; font-size:13px; color:var(--muted);}
.mu-post-cta{display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:18px; background:var(--emerald-tint); border:1px solid #d8e8e0; border-radius:var(--rc); padding:26px 28px; margin-top:40px;}
.mu-post-cta h3{font-size:19px; margin-bottom:4px;}
.mu-post-cta p{color:var(--muted); font-size:14px;}

/* ---------- contact ---------- */
.mu-contact-grid{display:grid; gap:28px; align-items:start; margin-top:8px;}
.mu-formcard{padding:30px;}
.mu-form{display:flex; flex-direction:column; gap:18px;}
.mu-field{display:flex; flex-direction:column; gap:7px;}
.mu-field label{font-size:14px; font-weight:600;}
.mu-field input,.mu-field select,.mu-field textarea{font:inherit; font-size:16px; color:var(--ink); background:var(--paper); border:1px solid var(--border); border-radius:12px; padding:12px 14px; width:100%; transition:border-color .15s ease, box-shadow .15s ease;}
.mu-field textarea{resize:vertical; min-height:120px;}
.mu-field input:focus,.mu-field select:focus,.mu-field textarea:focus{outline:none; border-color:var(--emerald); box-shadow:0 0 0 3px rgba(63,86,46,.14);}
.mu-field.err input,.mu-field.err select,.mu-field.err textarea{border-color:#c04343; box-shadow:0 0 0 3px rgba(192,67,67,.12);}
.mu-field .hint{font-size:12.5px; color:#c04343;}
.mu-field .hint-plain{font-size:12.5px; color:var(--muted);}
.err{font-size:12.5px; color:#c04343;}
.mu-selectwrap{position:relative;}
.mu-selectwrap select{appearance:none; padding-right:40px; cursor:pointer;}
.mu-selectwrap svg{position:absolute; right:14px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none;}
.mu-formnote{font-size:13px; color:var(--muted); display:flex; align-items:center; gap:7px;}
.mu-sent{text-align:center; padding:34px 10px; display:flex; flex-direction:column; align-items:center; gap:10px;}
.mu-sent .ic{width:56px; height:56px; border-radius:50%; background:var(--emerald-tint); color:var(--emerald); display:grid; place-items:center;}
.mu-sent p{color:var(--muted); max-width:38ch;}
.mu-contactinfo{display:flex; flex-direction:column; gap:22px;}
.mu-contact-photo{box-shadow:var(--sh-sm);}
.mu-inforow{display:flex; gap:14px; align-items:flex-start; padding:12px 0; border-bottom:1px solid var(--border); color:inherit; text-decoration:none;}
.mu-inforow:last-of-type{border-bottom:0;}
.mu-inforow .ic{flex:0 0 auto; width:38px; height:38px; border-radius:11px; background:var(--emerald-tint); color:var(--emerald); display:grid; place-items:center;}
.mu-inforow .k{display:block; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); font-weight:600;}
.mu-inforow .v{display:block; font-weight:600; margin-top:2px;}
a.mu-inforow:hover .v{color:var(--emerald);}
.mu-infosocials{margin-top:4px;}
.mu-socials.tight a{background:var(--emerald-tint); border-color:#d8e8e0; color:var(--emerald);}
.mu-socials.tight a:hover{background:var(--emerald); color:#fff; border-color:var(--emerald);}
.mu-map{margin-top:2px;}
.mu-map-inner{border:2px dashed var(--border); border-radius:var(--rc); padding:30px 22px; text-align:center; color:var(--muted); display:flex; flex-direction:column; align-items:center; gap:6px; background:var(--card);}
.mu-map-inner strong{color:var(--ink);}
.mu-map-inner span{font-size:13.5px;}

/* ---------- book trial modal ---------- */
.mu-modal-overlay{position:fixed; inset:0; z-index:120; background:rgba(20,24,17,.55); backdrop-filter:blur(3px); display:flex; align-items:center; justify-content:center; padding:20px; overflow-y:auto;}
.mu-modal{position:relative; width:100%; max-width:560px; max-height:calc(100vh - 40px); overflow-y:auto; background:var(--card); border-radius:24px; box-shadow:var(--sh-md); padding:34px 30px; margin:auto; animation:mu-modal-in .25s cubic-bezier(.2,.75,.2,1);}
@keyframes mu-modal-in{from{opacity:0; transform:translateY(14px) scale(.98);} to{opacity:1; transform:none;}}
.mu-modal-close{position:absolute; top:18px; right:18px; width:36px; height:36px; border-radius:50%; background:var(--paper); border:1px solid var(--border); color:var(--ink); display:flex; align-items:center; justify-content:center; cursor:pointer;}
.mu-modal-close:hover{background:var(--border);}
.mu-modal-title{font-size:23px; margin-right:36px;}
.mu-modal-sub{color:var(--muted); font-size:14.5px; margin:6px 0 22px;}
.mu-field-row{display:grid; grid-template-columns:1fr; gap:18px;}
.mu-hp{position:absolute; left:-9999px; width:1px; height:1px; opacity:0; pointer-events:none;}
@media(min-width:480px){
  .mu-field-row{grid-template-columns:1fr 1fr;}
}

/* ---------- floating buttons ---------- */
.mu-float-stack{position:fixed; right:20px; bottom:20px; z-index:80; display:flex; flex-direction:column-reverse; align-items:flex-end; gap:12px;}
.mu-totop{display:flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:50%; background:var(--card); color:var(--emerald); border:1px solid var(--border); box-shadow:var(--sh-md); cursor:pointer; opacity:0; transform:translateY(8px) scale(.9); pointer-events:none; transition:opacity .2s ease, transform .2s ease;}
.mu-totop.show{opacity:1; transform:none; pointer-events:auto;}
.mu-totop:hover{background:var(--emerald); color:#fff; border-color:var(--emerald); transform:translateY(-2px);}

/* ---------- chat bot ---------- */
.mu-chat-root{position:relative;}
.mu-chat-toggle{display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:50%; border:0; background:var(--emerald); color:#fff; cursor:pointer; box-shadow:0 10px 26px rgba(63,86,46,.4); transition:transform .2s ease, background .2s ease;}
.mu-chat-toggle:hover{transform:translateY(-2px); background:var(--emerald-mid);}
.mu-chat-panel{position:absolute; right:0; bottom:68px; width:min(340px, calc(100vw - 40px)); max-height:min(480px, calc(100vh - 140px)); background:var(--card); border:1px solid var(--border); border-radius:18px; box-shadow:var(--sh-md); display:flex; flex-direction:column; overflow:hidden; animation:mu-modal-in .2s ease;}
.mu-chat-head{display:flex; align-items:center; justify-content:space-between; padding:14px 16px; background:var(--emerald); color:#fff; flex-shrink:0;}
.mu-chat-head b{display:block; font-size:14.5px;}
.mu-chat-head span{display:block; font-size:12px; opacity:.8; margin-top:1px;}
.mu-chat-close{background:rgba(255,255,255,.16); border:0; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; color:#fff; cursor:pointer; flex-shrink:0;}
.mu-chat-list{flex:1; overflow-y:auto; padding:14px 14px 4px; display:flex; flex-direction:column; gap:10px; min-height:160px;}
.mu-chat-msg{display:flex; flex-direction:column;}
.mu-chat-msg.user{align-items:flex-end;}
.mu-chat-msg.bot{align-items:flex-start;}
.mu-chat-msg p{margin:0; padding:9px 13px; border-radius:14px; font-size:13.5px; line-height:1.5; max-width:85%;}
.mu-chat-msg.bot p{background:var(--paper); color:var(--ink); border-bottom-left-radius:4px;}
.mu-chat-msg.user p{background:var(--emerald); color:#fff; border-bottom-right-radius:4px;}
.mu-chat-actions{display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;}
.mu-chat-actions button,.mu-chat-actions a{display:inline-flex; align-items:center; gap:5px; font-size:12.5px; font-weight:600; padding:7px 12px; border-radius:999px; border:1px solid var(--border); background:var(--card); color:var(--emerald); cursor:pointer; text-decoration:none;}
.mu-chat-actions button:hover,.mu-chat-actions a:hover{background:var(--emerald-tint);}
.mu-chat-suggestions{display:flex; flex-direction:column; gap:6px; margin-top:2px;}
.mu-chat-suggestions button{text-align:left; font-size:12.5px; font-weight:500; padding:8px 12px; border-radius:10px; border:1px solid var(--border); background:var(--paper); color:var(--ink); cursor:pointer;}
.mu-chat-suggestions button:hover{border-color:var(--emerald); color:var(--emerald);}
.mu-chat-input{display:flex; gap:8px; padding:12px; border-top:1px solid var(--border); flex-shrink:0;}
.mu-chat-input input{flex:1; min-width:0; border:1px solid var(--border); border-radius:10px; padding:9px 12px; font-size:13.5px; font:inherit;}
.mu-chat-input input:focus{outline:none; border-color:var(--emerald);}
.mu-chat-input button{width:36px; height:36px; flex-shrink:0; border-radius:10px; border:0; background:var(--emerald); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer;}
.mu-chat-input button:hover{background:var(--emerald-mid);}

/* ---------- responsive ---------- */
@media(min-width:700px){
  .mu-grid{grid-template-columns:repeat(2,1fr);}
  .mu-steps{grid-template-columns:repeat(2,1fr); gap:28px 24px;}
  .mu-footcols{grid-template-columns:1.4fr 1fr 1fr; gap:44px;}
  .mu-chip.wk{display:block;}
}
@media(min-width:800px){
  .mu-detail-grid{grid-template-columns:1.6fr .9fr; gap:44px; align-items:start;}
  .mu-detail-side{position:sticky; top:92px;}
}
@media(min-width:900px){
  .mu-section{padding:104px 0;}
  .mu-about-split{grid-template-columns:1.05fr .95fr;}
  .mu-contact-grid{grid-template-columns:1.1fr .9fr;}
  .mu-feature{grid-template-columns:1.15fr .85fr;}
  .mu-feature-art{min-height:100%;}
  .mu-trustbar .grid{grid-template-columns:repeat(4,1fr);}
  .mu-stat{border-bottom:0 !important;}
  .mu-stat:last-child{border-right:0;}
  .mu-pricing-grid{grid-template-columns:repeat(3,1fr);}
  .mu-pricing-grid.cols2{grid-template-columns:repeat(2,1fr); max-width:720px; margin-left:auto; margin-right:auto;}
  .mu-pricing-grid.cols4{grid-template-columns:repeat(2,1fr);}
  .mu-plan.pop{transform:translateY(-14px);}
  .mu-footcols{grid-template-columns:1.6fr 1fr 1fr 1.3fr;}
}
@media(min-width:1000px){
  .mu-navlinks{display:flex;}
  .mu-visual-photo{display:block;}
  .mu-burger{display:none;}
  .mu-desktop-cta{display:inline-flex;}
  .mu-grid.cols3{grid-template-columns:repeat(3,1fr);}
  .mu-pricing-grid.cols4{grid-template-columns:repeat(4,1fr);}
  .mu-hero-inner{grid-template-columns:1.05fr .95fr; gap:56px;}
  .mu-steps{grid-template-columns:repeat(5,1fr); gap:20px;}
  .mu-step{padding-left:0; padding-top:60px;}
  .mu-steps::before{content:""; position:absolute; left:22px; right:22px; top:22px; height:1.5px; background:linear-gradient(90deg,var(--border),var(--emerald),var(--border)); z-index:0;}
  .mu-final{padding:80px 48px;}
}
@media(prefers-reduced-motion:reduce){
  .mu-root *{animation:none !important;}
  .mu-reveal{opacity:1 !important; transform:none !important; transition:none !important;}
  .mu-testi-track{transition:none !important;}
  .mu-live .pulse::after{display:none;}
  .mu-photo img{transition:none !important;}
  .mu-chat-toggle,.mu-chat-panel,.mu-filterchip,.mu-feature{transition:none !important;}
}
`;

/* ================= data ================= */
const STATS = [
  { n: "5,000+", l: "lessons delivered" },
  { n: "40+", l: "countries" },
  { n: "4.9★", l: "average rating" },
  { n: "100%", l: "native teachers" },
];

const WHY = [
  { icon: Mic, t: "Native Urdu Teachers", d: "Learn authentic pronunciation and real conversational Urdu from teachers who grew up speaking it." },
  { icon: UserCheck, t: "Truly 1-on-1", d: "Lessons adapt to your pace and goals, with personal attention every class." },
  { icon: Route, t: "Structured Curriculum", d: "From your first letter to reading poetry, follow a clear path — no guesswork." },
  { icon: CalendarClock, t: "Flexible Scheduling", d: "Book classes around your timezone, whether you're in Toronto or Dubai." },
  { icon: Repeat, t: "Practice That Sticks", d: "Homework, worksheets, and recordings keep progress going between classes." },
  { icon: TrendingUp, t: "Weekly Progress Reports", d: "See exactly what you've mastered and what's next." },
];

const COURSES = [
  {
    slug: "kids-1-1", icon: Baby, name: "Kids 1:1 Urdu Classes",
    meta: "Ages 5+ · 30 min · Live 1:1", format: "Live 1:1", lessonLength: "30 minutes",
    desc: "Perfect for children learning Urdu as a second language.",
    pricingType: "tiered",
    tiers: [{ lessons: 4, price: 32 }, { lessons: 8, price: 64 }, { lessons: 12, price: 96 }],
    price: "$32", unit: "/mo",
    featuresLabel: "Features",
    features: ["Personalized lessons", "Speaking practice", "Reading", "Writing", "Games", "Worksheets", "Homework support"],
    ctaLabel: "Book Trial", ctaKind: "trial",
  },
  {
    slug: "women-1-1", icon: Users, name: "Women 1:1 Urdu Classes",
    meta: "Adults · 50 min · Live 1:1", format: "Live 1:1", lessonLength: "50 minutes",
    desc: "Designed for adult women who want to confidently communicate in Urdu.",
    pricingType: "tiered",
    tiers: [{ lessons: 4, price: 48 }, { lessons: 8, price: 96 }, { lessons: 12, price: 144 }],
    price: "$48", unit: "/mo",
    featuresLabel: "Focus",
    features: ["Conversation", "Grammar", "Reading", "Writing", "Vocabulary", "Pronunciation", "Cultural understanding"],
    ctaLabel: "Book Trial", ctaKind: "trial",
  },
  {
    slug: "gcse-urdu-exam-prep", icon: GraduationCap, name: "GCSE Urdu Exam Preparation",
    meta: "16 weeks · 1x/week · 60 min", format: "Live 1:1", lessonLength: "60 minutes",
    desc: "Exam-focused Urdu preparation for GCSE success, built around the real syllabus.",
    pricingType: "flat",
    duration: "16 Weeks", frequency: "1 session per week", fee: 79,
    price: "$79", unit: " total",
    featuresLabel: "Includes",
    features: ["Speaking", "Listening", "Reading", "Writing", "Exam strategies", "Past paper practice", "Vocabulary", "Mock exams"],
    ctaLabel: "Enroll Now", ctaKind: "enroll",
  },
  {
    slug: "read-write-urdu", icon: BookOpen, name: "Read & Write Urdu Course",
    meta: "12 weeks · 1x/week · 40 min", format: "Live 1:1", lessonLength: "40 minutes",
    desc: "Go from the Urdu alphabet to confident reading and writing in three months.",
    pricingType: "flat",
    duration: "12 Weeks", frequency: "1 session per week", fee: 60,
    price: "$60", unit: " total",
    featuresLabel: "Students Learn",
    features: ["Urdu alphabet", "Reading fluency", "Writing skills", "Vocabulary", "Sentence building", "Reading practice"],
    ctaLabel: "Enroll Now", ctaKind: "enroll",
  },
  {
    slug: "summer-urdu-course", icon: Calendar, name: "Summer Urdu Course",
    meta: "Jul – Mid Aug · 6 weeks · 30 min", format: "Live 1:1", lessonLength: "30 minutes",
    desc: "Keep the momentum going this summer with playful, focused Urdu practice.",
    pricingType: "flat",
    available: "July – Mid August", duration: "6 Weeks", frequency: "2 sessions per week", fee: 55,
    price: "$55", unit: " total",
    featuresLabel: "Focus",
    features: ["Speaking", "Vocabulary", "Reading", "Writing", "Interactive games", "Cultural activities"],
    ctaLabel: "Enroll Now", ctaKind: "enroll",
  },
  {
    slug: "back-to-school-urdu", icon: Repeat, name: "Back-to-School Urdu Course",
    meta: "Late Aug – Sep · 6 weeks · 30 min", format: "Live 1:1", lessonLength: "30 minutes",
    desc: "Refresh and rebuild Urdu skills before the new school year begins.",
    pricingType: "flat",
    available: "Late August – September", duration: "6 Weeks", frequency: "2 sessions per week", fee: 55,
    price: "$55", unit: " total",
    featuresLabel: "Focus",
    features: ["Maintaining Urdu skills after summer", "Speaking confidence", "Reading", "Writing", "Revision activities"],
    ctaLabel: "Enroll Now", ctaKind: "enroll",
  },
];
const COURSE_BY_SLUG = Object.fromEntries(COURSES.map((c) => [c.slug, c]));

const STEPS = [
  { t: "Book a free trial", d: "Meet a teacher, no card required." },
  { t: "Quick assessment", d: "We find your exact starting level." },
  { t: "Choose your plan & schedule", d: "Pick times that fit your week." },
  { t: "Attend live classes", d: "Learn, practice, get feedback." },
  { t: "Track your progress", d: "Weekly reports and a certificate on completion." },
];

const TESTIMONIALS = [
  { q:"I went from not knowing the alphabet to reading short stories in four months. My teacher is endlessly patient.", a:"Fatima H., Canada" },
  { q:"My kids actually ask for their Urdu class now. That's a miracle.", a:"Omar S., USA" },
  { q:"I finally speak Urdu with my grandparents. Worth every minute.", a:"Zara A., UK" },
  { q:"Flexible timing meant I could learn around my shifts in Dubai.", a:"Hassan M., UAE" },
  { q:"Structured, professional, and genuinely warm. Best language investment I've made.", a:"Aisha B., Australia" },
];

const CLASS_TIERS = [4, 8, 12];

const PRIVATE_PLANS = [
  {
    id: "kids", kind: "private", name: "Kids 1:1", courseSlug: "kids-1-1",
    tagline: "Private lessons for young learners", minutes: 30,
    prices: { 4: 32, 8: 64, 12: 96 }, pop: false,
    cta: "Book Trial",
    incl: [
      "One-to-one with a dedicated teacher",
      "30 minutes per class",
      "Pick 4, 8, or 12 classes a month",
      "Lessons paced around your child",
      "Homework and recordings after class",
    ],
  },
  {
    id: "women", kind: "private", name: "Women 1:1", courseSlug: "women-1-1",
    tagline: "Private lessons for adult women", minutes: 50,
    prices: { 4: 48, 8: 96, 12: 144 }, pop: false,
    cta: "Book Trial",
    incl: [
      "One-to-one with a dedicated teacher",
      "50 minutes per class",
      "Pick 4, 8, or 12 classes a month",
      "Conversation, reading, or exam focus",
      "Homework and recordings after class",
    ],
  },
];

const GROUP_PLANS = [
  {
    id: "gcse", kind: "flat", name: "GCSE Urdu", courseSlug: "gcse-urdu-exam-prep",
    tagline: "Exam-focused preparation course",
    duration: "16 Weeks", frequency: "1 session/week", minutes: 60, fee: 79, pop: false,
    cta: "Enroll Now",
    incl: [
      "16 weeks, one 60-minute session a week",
      "Speaking, listening, reading & writing",
      "Exam strategies & past paper practice",
      "Mock exams before test day",
    ],
  },
  {
    id: "readwrite", kind: "flat", name: "Read & Write Urdu", courseSlug: "read-write-urdu",
    tagline: "Alphabet-to-fluency course",
    duration: "12 Weeks", frequency: "1 session/week", minutes: 40, fee: 60, pop: false,
    cta: "Enroll Now",
    incl: [
      "12 weeks, one 40-minute session a week",
      "Urdu alphabet to reading fluency",
      "Writing skills & sentence building",
      "Guided reading practice",
    ],
  },
  {
    id: "summer", kind: "flat", name: "Summer Course", courseSlug: "summer-urdu-course",
    tagline: "Summer intensive · Jul – Mid Aug",
    duration: "6 Weeks", frequency: "2 sessions/week", minutes: 30, fee: 55, pop: false,
    cta: "Enroll Now",
    incl: [
      "6 weeks, two 30-minute sessions a week",
      "Speaking, vocabulary, reading & writing",
      "Interactive games & cultural activities",
      "Runs July through mid-August",
    ],
  },
  {
    id: "backtoschool", kind: "flat", name: "Back-to-School Course", courseSlug: "back-to-school-urdu",
    tagline: "Refresher course · Late Aug – Sep",
    duration: "6 Weeks", frequency: "2 sessions/week", minutes: 30, fee: 55, pop: false,
    cta: "Enroll Now",
    incl: [
      "6 weeks, two 30-minute sessions a week",
      "Maintains skills after summer break",
      "Speaking confidence & revision activities",
      "Runs late August through September",
    ],
  },
];

const PLANS = [...PRIVATE_PLANS, ...GROUP_PLANS];

const FAQ = [
  { q:"Is the trial really free?", a:"Yes, one full class with a teacher, no credit card required." },
  { q:"How do I book my free trial?", a:"Pick a course, tell us your timezone and a time that suits you, and we'll match you with a teacher for one complete class." },
  { q:"What if I've never seen Urdu before?", a:"Perfect. Most students start from the alphabet; we assess and place you correctly." },
  { q:"Can I choose my class times?", a:"Yes. Tell us your timezone and availability and we schedule around you." },
  { q:"Can I reschedule a class?", a:"Yes. With reasonable notice we'll move a 1:1 class to another slot that suits you. Structured courses like GCSE prep follow a fixed weekly schedule, but every session is recorded so you never miss the material." },
  { q:"When does the GCSE Urdu course run?", a:"It's 16 weeks, one 60-minute session a week, on a fixed day and time agreed with your teacher when you enroll." },
  { q:"How do the 1:1 bundles work?", a:"Pick 4, 8, or 12 classes a month — 30 minutes each for kids, 50 minutes each for women. The more you book, the faster you progress, and your teacher plans each month around your goals." },
  { q:"When do the Summer and Back-to-School courses run?", a:"The Summer Urdu Course runs July through mid-August; the Back-to-School Urdu Course runs late August through September. Both are 6 weeks, two 30-minute sessions a week." },
  { q:"Are classes recorded?", a:"Every class is recorded and saved to your dashboard to rewatch anytime." },
  { q:"What are your teachers' qualifications?", a:"Every teacher is a native Urdu speaker with a formal qualification — in Urdu literature, linguistics, or education — plus years of online teaching experience." },
  { q:"Do I get a certificate?", a:"Yes. We track your progress throughout, and learners receive a certificate on completing their course." },
  { q:"What payment methods do you accept?", a:"We accept major credit and debit cards and popular local options. Kids and Women 1:1 are monthly subscriptions; GCSE, Read & Write, Summer, and Back-to-School are a single course fee paid at enrollment." },
  { q:"Do you offer refunds?", a:"If you're not satisfied after your first paid class, contact us within 7 days and we'll refund your payment in full." },
  { q:"Is there a minimum age to start?", a:"Our Kids course welcomes learners from age 5; other courses have no upper age limit." },
  { q:"Do you teach children?", a:"Yes, from age 5, with teachers who specialize in young learners." },
  { q:"How long does it take to learn Urdu?", a:"Most learners hold simple conversations within 3–4 months of weekly classes. Reading and writing fluency take longer and depend on your goals and practice." },
  { q:"Can I switch teachers or change my plan?", a:"Absolutely. You can request a different teacher, or upgrade, downgrade, or pause your 1:1 plan at any time." },
  { q:"Can I cancel anytime?", a:"Kids and Women 1:1 plans are monthly with no long-term contract. GCSE, Read & Write, Summer, and Back-to-School are a one-time enrollment for the full course." },
];

/* ================= about ================= */
const VALUES = [
  { icon: Heart, t:"Warmth first", d:"Language is personal. Every class is patient, judgment-free, and genuinely encouraging — mistakes are how we learn." },
  { icon: Compass, t:"Structure that guides", d:"No aimless chatter. A clear path from your first letter to reading poetry, with progress you can measure." },
  { icon: Users, t:"Real human teachers", d:"Not apps, not bots — native educators who adapt to you, your pace, and your goals every single lesson." },
  { icon: ShieldCheck, t:"Trust & flexibility", d:"Free trials, transparent pricing, class recordings, and cancel-anytime plans. No pressure, ever." },
  { icon: Globe, t:"Built for the diaspora", d:"Timezones from Toronto to Dubai, heritage learners reconnecting with family, and total beginners alike." },
  { icon: Feather, t:"Love of the language", d:"We teach Urdu as a living, beautiful thing — its sounds, its script, its poetry — not just a syllabus." },
];

const MILESTONES = [
  { y:"2019", t:"A single teacher, a few students", d:"Speak in Urdu began as one ustadha teaching cousins abroad over video calls." },
  { y:"2021", t:"A real curriculum", d:"We rebuilt lessons into a structured path — alphabet to fluency — with worksheets and recordings." },
  { y:"2023", t:"A team of natives", d:"Qualified teachers from across Pakistan joined, each with a specialty from kids to GCSE exam preparation." },
  { y:"2026", t:"Thousands of learners", d:"Students in 20+ countries now read, write, and speak Urdu with confidence." },
];

const FOUNDERS = [
  { initials:"RA", name:"Rabia A.", role:"Founder & Head of Curriculum", line:"Started it all teaching family abroad." },
  { initials:"IM", name:"Imran M.", role:"Co-founder & Operations", line:"Keeps timezones and teachers in sync." },
  { initials:"NF", name:"Nadia F.", role:"Lead Teacher-Trainer", line:"Coaches every new ustaad who joins." },
];

/* ================= blog ================= */
const BLOG_CATEGORIES = [
  "Learn Urdu", "Grammar", "Vocabulary", "Urdu Poetry", "Culture", "Travel", "Kids",
];

const POSTS = [
  {
    slug:"start-learning-urdu-from-zero",
    title:"How to Start Learning Urdu From Absolute Zero",
    cat:"Learn Urdu",
    date:"Jun 28, 2026", read:"6 min",
    author:{ name:"Ustadha Ayesha K.", initials:"AK" },
    excerpt:"Never seen the Urdu script before? Here's a calm, realistic first month that takes you from the alphabet to your first sentences.",
    body:[
      { type:"p", text:"If Urdu looks like beautiful but unreadable calligraphy right now, you're exactly where almost every one of our students started. The good news: Urdu is remarkably learnable when you follow a clear order instead of jumping around." },
      { type:"h", text:"Week 1 — Meet the sounds, not the whole alphabet" },
      { type:"p", text:"Urdu has 39 letters, but you don't memorize them like a list. Start with the most common sounds and the way letters change shape at the beginning, middle, and end of a word. Ten minutes of tracing a day beats an hour of cramming." },
      { type:"h", text:"Week 2 — Read three-letter words" },
      { type:"p", text:"Once a handful of letters feel familiar, you'll read your first real words. This is the moment students light up — the squiggles become language." },
      { type:"urdu", ur:"سلام", tr:"salaam", en:"peace / hello" },
      { type:"h", text:"Weeks 3–4 — Your first sentences" },
      { type:"p", text:"With a small set of words plus two or three verbs, you can already introduce yourself and ask simple questions. Speaking early — even badly — is what makes it stick." },
      { type:"tip", text:"Don't try to learn reading, writing, and speaking all at once from day one. Lead with sounds and speaking; let reading and writing follow. A teacher sequences this for you automatically." },
      { type:"p", text:"That's the whole secret of a good first month: small daily contact, in the right order, with someone to correct you gently." },
    ],
  },
  {
    slug:"urdu-alphabet-explained",
    title:"The Urdu Alphabet, Gently Explained",
    cat:"Learn Urdu",
    date:"Jun 20, 2026", read:"7 min",
    author:{ name:"Ustadha Hina N.", initials:"HN" },
    excerpt:"Why do letters change shape? What's a nuqta? A friendly tour of the script written for people who've never read right-to-left.",
    body:[
      { type:"p", text:"Urdu is written right-to-left in the flowing Nastaliq style. Two ideas make the whole script suddenly make sense." },
      { type:"h", text:"1. Letters change shape by position" },
      { type:"p", text:"Most letters have an initial, medial, and final form. They're the same letter — just joined differently depending on where they sit in the word. Once you see it, you can't un-see it." },
      { type:"h", text:"2. Dots (nuqte) do a lot of work" },
      { type:"p", text:"Several letters share the same base shape and are told apart only by the number and position of their dots. Learn the base shapes first; the dots come naturally after." },
      { type:"tip", text:"Practice by writing your own name. It's the single most motivating first exercise there is." },
    ],
  },
  {
    slug:"urdu-verb-tenses-basics",
    title:"Urdu Verb Tenses Without the Panic",
    cat:"Grammar",
    date:"Jun 12, 2026", read:"8 min",
    author:{ name:"Ustad Bilal R.", initials:"BR" },
    excerpt:"Present, past, future — Urdu tenses are more regular than English. Here's the pattern that unlocks all three.",
    body:[
      { type:"p", text:"English learners are often relieved to find that Urdu verbs follow tidy patterns. Master one root and you can build a lot." },
      { type:"h", text:"The core idea: root + ending" },
      { type:"p", text:"Urdu verbs are built from a root that takes predictable endings for gender, number, and tense. Once the endings are familiar, new verbs slot straight in." },
      { type:"urdu", ur:"میں پڑھتا ہوں", tr:"main parhta hoon", en:"I read / I am reading (masculine speaker)" },
      { type:"p", text:"Notice how the verb ending agrees with the speaker. That agreement is the one habit worth drilling early — it shows up everywhere." },
      { type:"tip", text:"Learn verbs in full short sentences, never as bare dictionary forms. Your brain remembers patterns, not lists." },
    ],
  },
  {
    slug:"gender-in-urdu-grammar",
    title:"Grammatical Gender in Urdu: A Practical Guide",
    cat:"Grammar",
    date:"May 30, 2026", read:"6 min",
    author:{ name:"Ustad Tariq F.", initials:"TF" },
    excerpt:"Every Urdu noun is masculine or feminine, and it changes the words around it. Here's how to stop guessing.",
    body:[
      { type:"p", text:"Gender in Urdu isn't about meaning — it's a grammatical category that affects adjectives and verbs. The trick is to learn each noun together with its gender from the start." },
      { type:"list", items:[
        "Learn the noun and its gender as one unit, like a single flashcard.",
        "Watch the adjective ending — it shifts to agree with the noun.",
        "Read and listen a lot; agreement becomes intuition faster than you'd expect.",
      ]},
      { type:"tip", text:"When you meet a new noun, immediately say a tiny phrase with an adjective. The ending will lock the gender into memory." },
    ],
  },
  {
    slug:"100-everyday-urdu-words",
    title:"The First 100 Urdu Words Worth Knowing",
    cat:"Vocabulary",
    date:"May 22, 2026", read:"5 min",
    author:{ name:"Ustadha Maria J.", initials:"MJ" },
    excerpt:"Vocabulary is leverage. These everyday words appear constantly — learn them and you'll understand far more than 100 words' worth.",
    body:[
      { type:"p", text:"Not all words are equal. A small core of high-frequency words carries an outsized share of everyday conversation. Start here rather than with random lists." },
      { type:"h", text:"Greetings and courtesy" },
      { type:"urdu", ur:"شکریہ", tr:"shukriya", en:"thank you" },
      { type:"h", text:"People and family" },
      { type:"p", text:"Family words come up constantly — especially for heritage learners reconnecting with relatives. They're emotional, memorable, and immediately useful." },
      { type:"tip", text:"Group new words by theme, not alphabetically. Themed clusters stick because your brain links them together." },
    ],
  },
  {
    slug:"reading-ghalib-for-beginners",
    title:"Reading Ghalib: An Invitation for Beginners",
    cat:"Urdu Poetry",
    date:"May 10, 2026", read:"7 min",
    author:{ name:"Ustad Tariq F.", initials:"TF" },
    excerpt:"Classical Urdu poetry can feel intimidating. Start with one line, one image, and let the language do the rest.",
    body:[
      { type:"p", text:"Mirza Ghalib (1797–1869) is the poet many learners fall in love with. Because his work is more than a century and a half old, it sits firmly in the public domain — and it's a wonderful, safe place to begin reading real poetry." },
      { type:"p", text:"You don't need advanced Urdu to feel a couplet. Start with a single, famous line and read it slowly, aloud." },
      { type:"quote", text:"ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے", by:"Mirza Ghalib" },
      { type:"p", text:"Transliterated: hazaaron khwahishen aisi ke har khwahish pe dam nikle — 'a thousand desires, each one enough to take my breath.' Notice how much feeling rides on a handful of words." },
      { type:"tip", text:"Read classical couplets out loud before you fully understand them. The rhythm teaches your ear, and meaning follows." },
      { type:"p", text:"In our Advanced course we read Ghalib and other classical poets line by line — never rushing, always savoring." },
    ],
  },
  {
    slug:"why-urdu-poetry-matters",
    title:"Why Urdu Poetry Still Moves Millions",
    cat:"Urdu Poetry",
    date:"Apr 28, 2026", read:"6 min",
    author:{ name:"Ustadha Sana M.", initials:"SM" },
    excerpt:"From mushairas to song lyrics, poetry is woven into daily life. Understanding a little unlocks a whole culture.",
    body:[
      { type:"p", text:"In much of South Asia, poetry isn't a niche hobby — it's everywhere: in conversation, in film songs, in the way people express love and grief. Learning even a little transforms how you hear the language." },
      { type:"h", text:"The ghazal, briefly" },
      { type:"p", text:"The ghazal is a form of independent couplets bound by rhyme and refrain. Each couplet can stand alone, which is why single lines travel so well through culture." },
      { type:"tip", text:"You'll enjoy poetry far sooner if you learn to read the script fluently first. Reading speed is what lets the music come through." },
    ],
  },
  {
    slug:"urdu-culture-etiquette",
    title:"Urdu Culture & Etiquette: What Learners Should Know",
    cat:"Culture",
    date:"Apr 16, 2026", read:"6 min",
    author:{ name:"Ustadha Sana M.", initials:"SM" },
    excerpt:"Language and culture travel together. A few customs around greetings, hospitality, and respect go a long way.",
    body:[
      { type:"p", text:"Speaking a language well means understanding the culture behind it. In Urdu-speaking communities, a few small courtesies signal warmth and respect instantly." },
      { type:"list", items:[
        "Greetings matter — taking a moment to ask after family is normal and appreciated.",
        "Hospitality is generous; accepting tea graciously is part of the ritual.",
        "Respectful address for elders is built right into the grammar itself.",
      ]},
      { type:"tip", text:"Ask your teacher about the 'why' behind a custom, not just the 'what.' The stories make the language memorable." },
    ],
  },
  {
    slug:"urdu-phrases-for-travel",
    title:"20 Urdu Phrases That Make Travel Easier",
    cat:"Travel",
    date:"Apr 4, 2026", read:"5 min",
    author:{ name:"Ustad Adnan R.", initials:"AR" },
    excerpt:"Heading to Pakistan or visiting family? A handful of phrases turns nervous gestures into real, warm conversations.",
    body:[
      { type:"p", text:"You don't need fluency to travel well — you need the right twenty phrases, said with a smile. Locals respond warmly to any effort to speak Urdu." },
      { type:"h", text:"The essentials" },
      { type:"urdu", ur:"یہ کتنے کا ہے؟", tr:"yeh kitne ka hai?", en:"how much is this?" },
      { type:"p", text:"Add greetings, thanks, and a couple of directions, and you can navigate markets, taxis, and introductions with confidence." },
      { type:"tip", text:"Practice phrases as whole sounds, not word-by-word. You want them to come out automatically when you're on the spot." },
    ],
  },
  {
    slug:"teaching-kids-urdu-at-home",
    title:"Helping Kids Learn Urdu (Without the Battles)",
    cat:"Kids",
    date:"Mar 25, 2026", read:"6 min",
    author:{ name:"Ustadha Zoya K.", initials:"ZK" },
    excerpt:"For diaspora parents, keeping Urdu alive at home is a gift — and it doesn't have to be a fight. Play beats pressure.",
    body:[
      { type:"p", text:"Many parents worry their children are losing the family language. The best approach is almost always the opposite of school-style drilling: short, playful, positive contact." },
      { type:"list", items:[
        "Keep sessions short and game-like — five happy minutes beats twenty tense ones.",
        "Tie Urdu to things kids love: food, cartoons, grandparents, songs.",
        "Praise effort loudly and correct gently; confidence is the real curriculum.",
      ]},
      { type:"tip", text:"Kids thrive with a teacher who makes it fun and a parent who cheers them on. Our Kids course is built entirely around play." },
    ],
  },
];

/* ================= imagery ================= */
/* Central Unsplash map — swap any URL freely. Each <Photo> degrades to a
   branded gradient+pattern fallback if an image fails to load. */
const u = (id, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  hero: u("1503676260728-1c00da094a0b", 900),
  courses: {
    "kids-1-1": u("1503454537195-1dcabb73ffb9"),
    "women-1-1": u("1522202176988-66273c2fd55f"),
    "gcse-urdu-exam-prep": u("1512820790803-83ca734da794"),
    "read-write-urdu": u("1455390582262-044cdead277a"),
    "summer-urdu-course": u("1506905925346-21bda4d32df4"),
    "back-to-school-urdu": u("1481627834876-b7833e8f5570"),
  },
  blog: {
    "Learn Urdu": u("1481627834876-b7833e8f5570"),
    "Grammar": u("1455390582262-044cdead277a"),
    "Vocabulary": u("1509062522246-3755977927d7"),
    "Urdu Poetry": u("1512820790803-83ca734da794"),
    "Culture": u("1544787219-7f47ccb76574"),
    "Travel": u("1506905925346-21bda4d32df4"),
    "Kids": u("1503454537195-1dcabb73ffb9"),
  },
  aboutBanner: u("1507842217343-583bb7270b66", 1500),
  contact: u("1544787219-7f47ccb76574"),
};

/* Art directions per subject — always renders, photos enhance on top when available. */
const ART = {
  hero: { word: "اردو", variant: "calli" },
  courses: {
    "kids-1-1": { word: "بچے", variant: "star" },
    "women-1-1": { word: "خواتین", variant: "waves" },
    "gcse-urdu-exam-prep": { word: "امتحان", variant: "geo" },
    "read-write-urdu": { word: "پڑھنا", variant: "arch" },
    "summer-urdu-course": { word: "گرمی", variant: "rays" },
    "back-to-school-urdu": { word: "اسکول", variant: "calli" },
  },
  blog: {
    "Learn Urdu": { word: "سیکھیں", variant: "arch" },
    "Grammar": { word: "قواعد", variant: "geo" },
    "Vocabulary": { word: "الفاظ", variant: "star" },
    "Urdu Poetry": { word: "شاعری", variant: "calli" },
    "Culture": { word: "ثقافت", variant: "arch" },
    "Travel": { word: "سفر", variant: "waves" },
    "Kids": { word: "بچے", variant: "star" },
  },
  aboutBanner: { word: "ہماری کہانی", variant: "calli" },
  contact: { word: "رابطہ", variant: "rays" },
};

const starPts = (cx, cy, ro, ri, n = 8) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const r = i % 2 ? ri : ro;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");


const NAV = [
  { label:"Home", type:"route", target:"home" },
  { label:"Courses", type:"route", target:"courses" },
  { label:"Pricing", type:"route", target:"pricing" },
  { label:"How to Pay", type:"route", target:"payment" },
  { label:"Blog", type:"route", target:"blog" },
  { label:"About", type:"route", target:"about" },
  { label:"Contact", type:"route", target:"contact" },
];

/* ================= routing ================= */
const Nav = createContext(null);
const useNav = () => useContext(Nav);

function parseHash() {
  const h = (typeof window !== "undefined" ? window.location.hash : "") || "";
  if (h.startsWith("#/courses/")) return { name: "course", slug: h.slice("#/courses/".length) };
  if (h === "#/courses") return { name: "courses" };
  if (h === "#/pricing") return { name: "pricing" };
  if (h === "#/payment") return { name: "payment" };
  if (h === "#/about") return { name: "about" };
  if (h.startsWith("#/blog/")) return { name: "post", slug: h.slice("#/blog/".length) };
  if (h === "#/blog") return { name: "blog" };
  if (h === "#/contact") return { name: "contact" };
  return { name: "home" };
}
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= primitives ================= */
function Styles() { return <style dangerouslySetInnerHTML={{ __html: CSS }} />; }

function Pattern() {
  return (
    <svg className="mu-pattern" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="mu-geo" width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.1">
            <rect x="19" y="19" width="26" height="26" />
            <rect x="19" y="19" width="26" height="26" transform="rotate(45 32 32)" />
            <circle cx="32" cy="32" r="4.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mu-geo)" />
    </svg>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mu-reveal ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Stars({ size = 15, animate = false, label }) {
  return (
    <span className="mu-stars" role="img" aria-label={label || "5 out of 5 stars"}>
      {[0,1,2,3,4].map((i) => (
        <Star key={i} size={size} strokeWidth={0}
          className={animate ? "mu-anim-star" : ""}
          style={animate ? { animationDelay: `${i * 90}ms` } : undefined} />
      ))}
    </span>
  );
}

function SectionHeader({ eyebrow, title, lead, center = true, id }) {
  return (
    <Reveal className={center ? "mu-center" : ""}>
      <span className="mu-eyebrow">{eyebrow}</span>
      <h2 className="mu-h2" id={id} style={{ marginTop: 14 }}>{title}</h2>
      {lead && <p className="mu-lead">{lead}</p>}
    </Reveal>
  );
}

/* shared PlanCard used on landing + pricing page */
function PlanCard({ plan, classes = 8, from = false, onCta, headingTag = "h3" }) {
  const Tag = headingTag;
  const flat = plan.kind === "flat";
  let price, note;
  if (flat) {
    price = plan.fee;
    note = `${plan.duration} · ${plan.frequency} · ${plan.minutes} min`;
  } else {
    const perClass = Math.round(plan.prices[4] / 4);
    price = from ? plan.prices[4] : plan.prices[classes];
    note = from
      ? `From $${perClass}/class · ${plan.minutes} min each`
      : `${classes} classes/month · $${perClass}/class · ${plan.minutes} min`;
  }
  return (
    <div className={`mu-plan ${plan.pop ? "pop" : ""}`}>
      {plan.pop && <span className="mu-popbadge"><Sparkles size={13} /> Most Popular</span>}
      <Tag>{plan.name}</Tag>
      <p className="tagline">{plan.tagline}</p>
      <div className="mu-planprice">
        {from && !flat && <span className="mu-fromlbl">from</span>}
        ${price}<small className="mu-currency"> USD</small>{!flat && <small>/mo</small>}
      </div>
      <p className="mu-annnote">{note}</p>
      <ul className="incl">
        {plan.incl.map((x) => <li key={x}><Check size={17} strokeWidth={2.4} /> {x}</li>)}
      </ul>
      <div className="btnwrap">
        <button className={`mu-btn mu-btn-md mu-btn-block ${plan.pop ? "mu-btn-primary" : "mu-btn-ghost"}`} onClick={onCta}>{plan.cta}</button>
        <p className="subnote">{flat ? "Free trial · One-time course fee" : "Free trial · Cancel anytime"}</p>
      </div>
    </div>
  );
}

/* ================= header ================= */
function Header() {
  const { route, goSection, goRoute, goHomeTop, goTrial } = useNav();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handle = (item) => { setOpen(false); item.type === "route" ? goRoute(item.target) : goSection(item.target); };
  const isActive = (item) =>
    item.type === "route" && (
      route.name === item.target ||
      (item.target === "courses" && route.name === "course") ||
      (item.target === "blog" && route.name === "post")
    );
  return (
    <header className={`mu-header ${stuck ? "is-stuck" : ""}`}>
      <div className="mu-wrap">
        <nav className="mu-nav" aria-label="Primary">
          <button className="mu-brand" onClick={() => { setOpen(false); goHomeTop(); }}>
            <img className="mu-brand-full" src={logoFullWhite} alt="Speak in Urdu" width="79" height="44" />
          </button>
          <div className="mu-navlinks">
            {NAV.map((n) => (
              <button key={n.label} className={isActive(n) ? "active" : ""} onClick={() => handle(n)}
                aria-current={isActive(n) ? "page" : undefined}>{n.label}</button>
            ))}
          </div>
          <div className="mu-navright">
            <button className="mu-btn mu-btn-md mu-btn-gold mu-desktop-cta" onClick={goTrial}>Book Free Trial</button>
            <button className="mu-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(v => !v)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <div className={`mu-mobile ${open ? "open" : ""}`}>
          {NAV.map((n) => <button key={n.label} className="ml" onClick={() => handle(n)}>{n.label}</button>)}
          <button className="mu-btn mu-btn-md mu-btn-gold mu-btn-block" onClick={() => { setOpen(false); goTrial(); }}>Book Free Trial</button>
        </div>
      </div>
    </header>
  );
}

/* ================= landing sections ================= */
const ART_GRADS = {
  calli: ["#3F562E", "#52713D"],
  arch: ["#33461F", "#5E7A45"],
  rays: ["#4A6238", "#6B8A4A"],
  waves: ["#2C3D1E", "#52713D"],
  star: ["#3F562E", "#6B8A4A"],
  geo: ["#33461F", "#52713D"],
};

function ArtScene({ word = "اردو", variant = "geo", icon: Ico }) {
  const gid = "g" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const [c1, c2] = ART_GRADS[variant] || ART_GRADS.geo;
  return (
    <span className="mu-art" aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#${gid})`} />
        {variant === "calli" && (
          <g fill="none" strokeLinecap="round">
            <path d="M-20 210 C 90 150, 150 260, 260 190 S 420 140, 430 170" stroke="rgba(255,255,255,.13)" strokeWidth="26" />
            <path d="M-20 140 C 120 84, 220 196, 420 104" stroke="rgba(255,255,255,.09)" strokeWidth="10" />
            <path d="M-20 248 C 140 202, 260 282, 430 222" stroke="rgba(201,162,39,.5)" strokeWidth="3" />
          </g>
        )}
        {variant === "arch" && (
          <g fill="none" strokeWidth="2">
            <path d="M120 300 V 176 Q 120 104 200 94 Q 280 104 280 176 V 300" stroke="rgba(255,255,255,.18)" />
            <path d="M88 300 V 168 Q 88 76 200 64 Q 312 76 312 168 V 300" stroke="rgba(255,255,255,.12)" />
            <path d="M56 300 V 160 Q 56 48 200 34 Q 344 48 344 160 V 300" stroke="rgba(201,162,39,.45)" />
          </g>
        )}
        {variant === "rays" && (
          <g>
            <g stroke="rgba(255,255,255,.11)" strokeWidth="2">
              <line x1="400" y1="0" x2="0" y2="36" /><line x1="400" y1="0" x2="0" y2="120" />
              <line x1="400" y1="0" x2="0" y2="216" /><line x1="400" y1="0" x2="40" y2="300" />
              <line x1="400" y1="0" x2="150" y2="300" /><line x1="400" y1="0" x2="255" y2="300" />
              <line x1="400" y1="0" x2="345" y2="300" />
            </g>
            <circle cx="400" cy="0" r="74" fill="rgba(201,162,39,.28)" />
            <circle cx="400" cy="0" r="110" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="2" />
          </g>
        )}
        {variant === "waves" && (
          <g fill="none" strokeWidth="2.5">
            <path d="M-10 198 Q 100 166 200 198 T 410 198" stroke="rgba(255,255,255,.2)" />
            <path d="M-10 230 Q 100 198 200 230 T 410 230" stroke="rgba(255,255,255,.13)" />
            <path d="M-10 262 Q 100 230 200 262 T 410 262" stroke="rgba(201,162,39,.5)" />
          </g>
        )}
        {variant === "star" && (
          <g fill="none" strokeWidth="2">
            <polygon points={starPts(320, 84, 82, 54)} stroke="rgba(255,255,255,.2)" />
            <polygon points={starPts(320, 84, 48, 31)} stroke="rgba(201,162,39,.45)" />
            <circle cx="66" cy="236" r="4" fill="rgba(255,255,255,.3)" />
            <circle cx="104" cy="262" r="3" fill="rgba(201,162,39,.5)" />
            <circle cx="46" cy="196" r="2.5" fill="rgba(255,255,255,.24)" />
          </g>
        )}
        {variant === "geo" && (
          <g fill="none" strokeWidth="2">
            <line x1="-20" y1="300" x2="420" y2="30" stroke="rgba(255,255,255,.07)" strokeWidth="42" />
            <polygon points={starPts(88, 232, 62, 41)} stroke="rgba(255,255,255,.15)" />
            <polygon points={starPts(330, 68, 46, 30)} stroke="rgba(201,162,39,.4)" />
          </g>
        )}
      </svg>
      <span className="mu-art-word mu-urdu">{word}</span>
      {Ico && <span className="mu-art-ico"><Ico size={15} strokeWidth={2} /></span>}
    </span>
  );
}

function Photo({ src, alt = "", ratio, className = "", overlay = false, eager = false, icon: Ico, art }) {
  const [ok, setOk] = useState(false);
  return (
    <div className={`mu-photo ${ok ? "is-ok" : ""} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}>
      <ArtScene word={art?.word} variant={art?.variant} icon={Ico} />
      {src && (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async"
          onLoad={() => setOk(true)} onError={() => setOk(false)} />
      )}
      {overlay && ok && <span className="mu-photo-ov" aria-hidden="true" />}
    </div>
  );
}

function Hero() {
  const { goTrial, goRoute } = useNav();
  return (
    <section className="mu-hero" id="home">
      <Pattern />
      <div className="mu-wrap">
        <div className="mu-hero-inner">
          <Reveal>
            <span className="mu-eyebrow">Live 1-on-1 online classes • Native teachers</span>
            <h1>Learn Urdu the way it's meant to be spoken.</h1>
            <p className="mu-lead">Read, write, and speak beautiful Urdu with native teachers — structured courses, live classes, and weekly progress you can actually feel.</p>
            <div className="mu-hero-ctas">
              <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={goTrial}>Book a Free Trial <ArrowRight size={18} /></button>
              <button className="mu-btn mu-btn-lg mu-btn-ghost" onClick={() => goRoute("courses")}>Explore Courses</button>
            </div>
            <div className="mu-trustrow">
              <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
                <Stars size={15} animate label="Rated 4.9 out of 5" /> 4.9/5 from 1,200+ learners
              </span>
              <span className="dot" aria-hidden="true" />
              <span>Students in 40+ countries</span>
              <span className="dot" aria-hidden="true" />
              <span>100% native teachers</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="mu-visual" aria-hidden="true">
              <Photo className="mu-visual-photo" src={IMG.hero} art={ART.hero} ratio="4 / 5" overlay eager icon={BookOpen} />
              <span className="mu-visual-urdu mu-urdu">اردو</span>
              <div className="mu-vcard">
                <div className="row1">
                  <span className="label">Today's lesson</span>
                  <span className="mu-live"><span className="pulse" /> Live class</span>
                </div>
                <h3 style={{ fontSize:20, marginBottom:4 }}>The Urdu Alphabet</h3>
                <p style={{ color:"var(--muted)", fontSize:14 }}>Lesson 3 of 12 · Reading foundations</p>
                <div className="mu-letters">
                  <span className="mu-letter">ا</span><span className="mu-letter">ب</span>
                  <span className="mu-letter hot">پ</span><span className="mu-letter">ت</span>
                </div>
                <div className="mu-prog"><span /></div>
                <div className="progmeta"><span>Progress this week</span><span>68%</span></div>
              </div>
              <div className="mu-chip rating">
                <span className="big">4.9</span>
                <span>
                  <Stars size={13} label="4.9 star rating" />
                  <span style={{ display:"block", fontSize:12, color:"var(--muted)", marginTop:2 }}>1,200+ reviews</span>
                </span>
              </div>
              <div className="mu-chip wk">
                <span className="t">This week</span>
                <span className="v"><Award size={15} /> 3 lessons</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="mu-trustbar" aria-label="Academy at a glance">
      <div className="mu-wrap">
        <div className="grid">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 60}>
              <div className="mu-stat"><div className="n">{s.n}</div><div className="l">{s.l}</div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="mu-section" aria-labelledby="why-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="Why Master Urdu" title="A warmer, more human way to learn Urdu."
          lead="Everything is built around live teaching, real feedback, and steady progress you can see." />
        <div className="mu-grid cols3">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <Reveal key={w.t} delay={(i % 3) * 90}>
                <article className="mu-card">
                  <div className="mu-ico"><Icon size={24} strokeWidth={1.8} /></div>
                  <h3 id={i===0 ? "why-h" : undefined}>{w.t}</h3>
                  <p>{w.d}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* reusable course card (landing + courses page) */
function CourseCard({ c, showDetail = true, headingTag = "h3" }) {
  const { goCourse, goTrial } = useNav();
  const Icon = c.icon;
  const Tag = headingTag;
  const flat = c.pricingType === "flat";
  return (
    <article className="mu-card mu-course">
      <Photo className="mu-course-media" src={IMG.courses[c.slug]} art={ART.courses[c.slug]} alt="" ratio="16 / 9" overlay icon={Icon} />
      <div className="top">
        <div className="mu-ico" style={{ marginBottom:0 }}><Icon size={22} strokeWidth={1.8} /></div>
        <span className="mu-meta">{c.meta}</span>
      </div>
      <Tag>{c.name}</Tag>
      <p className="desc" style={{ color:"var(--muted)" }}>{c.desc}</p>
      <div className="mu-featlabel">{c.featuresLabel}</div>
      <ul className="mu-bullets">
        {c.features.map((b) => <li key={b}><Check size={16} strokeWidth={2.4} /> {b}</li>)}
      </ul>
      <div className="foot">
        <span className="mu-price">
          {!flat && <small>From</small>}
          {c.price}
          <small className="mu-currency" style={{ display:"inline", textTransform:"none", letterSpacing:0, marginLeft:2 }}> USD{c.unit}</small>
        </span>
        <div className="links">
          {showDetail && <button className="mu-textlink" onClick={() => goCourse(c.slug)}>Details <ArrowRight size={15} /></button>}
          <button className="mu-btn mu-btn-md mu-btn-ghost" onClick={() => goTrial(c.slug)}>{c.ctaLabel}</button>
        </div>
      </div>
    </article>
  );
}

function CoursesSection() {
  const { goRoute } = useNav();
  return (
    <section className="mu-section" id="courses" style={{ background:"var(--card)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} aria-labelledby="courses-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="Courses" title="Find the path that fits you."
          lead="Structured tracks for every age and goal — private 1:1 classes plus seasonal and exam-focused courses." />
        <div className="mu-grid cols3">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 90}>
              <CourseCard c={c} headingTag={i===0 ? "h3" : "h3"} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mu-center" >
          <div style={{ marginTop:34 }}>
            <button className="mu-btn mu-btn-lg mu-btn-ghost" onClick={() => goRoute("courses")}>
              View all courses & syllabus <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mu-section" id="how" aria-labelledby="how-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="How it works" title="From first hello to fluent — in five steps."
          lead="A simple, guided start. You'll be in your first live class this week." />
        <div className="mu-steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="mu-step">
                <span className="num" aria-hidden="true">{i + 1}</span>
                <h3 id={i===0 ? "how-h" : undefined}>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;
  const go = useCallback((next) => setI(((next % n) + n) % n), [n]);
  useEffect(() => {
    if (reducedMotion() || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);
  const onKey = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
  };
  return (
    <section className="mu-section mu-testi" id="reviews" aria-labelledby="rev-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="Loved by learners" title="Stories from our students." lead={null} />
        <span id="rev-h" className="mu-sr">Student reviews</span>
        <div className="mu-testi-track-wrap" style={{ marginTop: 40 }}
          role="region" aria-roledescription="carousel" aria-label="Student testimonials"
          tabIndex={0} onKeyDown={onKey}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="mu-testi-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {TESTIMONIALS.map((t, idx) => (
              <div className="mu-testi-slide" key={t.a} aria-hidden={idx !== i}>
                <figure className="mu-quotecard">
                  <Quote className="qmark" size={30} strokeWidth={0} style={{ fill:"var(--gold)" }} />
                  <blockquote>“{t.q}”</blockquote>
                  <figcaption><cite>— {t.a}</cite></figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
        <div className="mu-testi-controls">
          <button className="mu-arrow" onClick={() => go(i - 1)} aria-label="Previous testimonial"><ChevronLeft size={20} /></button>
          <div className="mu-dots" role="tablist" aria-label="Choose testimonial">
            {TESTIMONIALS.map((t, idx) => (
              <button key={t.a} className={`mu-dot ${idx === i ? "on" : ""}`} onClick={() => go(idx)}
                role="tab" aria-selected={idx === i} aria-label={`Testimonial ${idx + 1} of ${n}`} />
            ))}
          </div>
          <button className="mu-arrow" onClick={() => go(i + 1)} aria-label="Next testimonial"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { goRoute, goTrial } = useNav();
  return (
    <section className="mu-section" id="pricing" style={{ background:"var(--card)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} aria-labelledby="price-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="Pricing" title="Simple plans, real teachers."
          lead="Private 1:1 tuition for kids and women, plus structured courses like GCSE exam prep — each with a free trial." />
        <div className="mu-pricing-grid">
          {PLANS.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <PlanCard plan={p} from onCta={() => goTrial(p.courseSlug)} headingTag="h3" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mu-center">
          <div style={{ marginTop:32 }}>
            <button className="mu-textlink" onClick={() => goRoute("pricing")}>See bundles & compare plans <ArrowRight size={16} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ item, open, onToggle, id }) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => { setH(open && ref.current ? ref.current.scrollHeight : 0); }, [open]);
  return (
    <div className="mu-faq-item">
      <button className="mu-faq-q" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
        {item.q}
        <span className="ic" aria-hidden="true"><ChevronDown size={18} /></span>
      </button>
      <div className="mu-faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} style={{ maxHeight: h }}>
        <div className="inner" ref={ref}>{item.a}</div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mu-section" aria-labelledby="faq-h">
      <div className="mu-wrap">
        <SectionHeader eyebrow="Questions" title="Everything you might be wondering." lead={null} />
        <span id="faq-h" className="mu-sr">Frequently asked questions</span>
        <Reveal>
          <div className="mu-faq">
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} id={`faq-${i}`} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCta() {
  const { goTrial } = useNav();
  return (
    <section className="mu-wrap" id="final" style={{ paddingTop: 8 }}>
      <Reveal>
        <div className="mu-final mu-on-dark">
          <Pattern />
          <div className="flourish mu-urdu" aria-hidden="true">اردو</div>
          <h2>Your first Urdu conversation is closer than you think.</h2>
          <p>Book a free trial today — meet your teacher, no card required.</p>
          <button className="mu-btn mu-btn-lg mu-btn-gold" style={{ position:"relative" }} onClick={goTrial}>Book a Free Trial <ArrowRight size={18} /></button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const { goSection, goRoute, goCourse } = useNav();
  const [email, setEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState("idle"); // idle | submitting | done | error
  const subscribe = async () => {
    if (!email.trim() || newsStatus === "submitting") return;
    setNewsStatus("submitting");
    try {
      const body = new URLSearchParams({ email });
      const res = await fetch("/newsletter.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      const data = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && data.success !== false) {
        setNewsStatus("done");
        setEmail("");
      } else {
        setNewsStatus("error");
      }
    } catch {
      setNewsStatus("error");
    }
  };
  return (
    <footer className="mu-footer mu-on-dark">
      <Pattern />
      <div className="mu-wrap">
        <div className="mu-footcols">
          <div className="mu-footbrand">
            <div className="mu-brand">
              <img className="mu-brand-full" src={logoFullWhite} alt="Speak in Urdu" width="79" height="44" />
            </div>
            <p>Live 1-on-1 Urdu classes with native teachers. Read, write, and speak beautiful Urdu — from your first letter to exam success.</p>
            <div className="mu-socials">
              <a href="https://www.instagram.com/speakinurdu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/profile.php?id=61590513969029" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.youtube.com/@SpeakinUrdu" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#/" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>
          <div className="mu-footcol">
            <h4>Courses</h4>
            {COURSES.map((c) => (
              <button key={c.slug} className="fl" onClick={() => goCourse(c.slug)}>{c.name}</button>
            ))}
          </div>
          <div className="mu-footcol">
            <h4>Academy</h4>
            <button className="fl" onClick={() => goRoute("about")}>About Us</button>
            <button className="fl" onClick={() => goRoute("courses")}>All Courses</button>
            <button className="fl" onClick={() => goRoute("pricing")}>Pricing</button>
            <button className="fl" onClick={() => goRoute("payment")}>How to Pay</button>
            <button className="fl" onClick={() => goRoute("blog")}>Blog</button>
            <button className="fl" onClick={() => goRoute("contact")}>Contact</button>
            <button className="fl" onClick={() => goSection("how")}>How It Works</button>
          </div>
          <div className="mu-footcol">
            <h4>Stay in touch</h4>
            <p style={{ color:"#C9C0AE", fontSize:14, margin:0 }}>Study tips and new courses, now and then.</p>
            <div className="mu-news">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com" aria-label="Email address for newsletter"
                onKeyDown={(e) => { if (e.key === "Enter") subscribe(); }} />
              <button className="mu-btn mu-btn-md mu-btn-gold" onClick={subscribe} disabled={newsStatus === "submitting"}>
                {newsStatus === "submitting" ? "…" : "Subscribe"}
              </button>
            </div>
            {newsStatus === "done" && <p style={{ color:"var(--gold-soft)", fontSize:13.5, marginTop:10 }}>Thanks — you're on the list.</p>}
            {newsStatus === "error" && <p style={{ color:"#e08a7d", fontSize:13.5, marginTop:10 }}>Something went wrong — please try again.</p>}
          </div>
        </div>
        <div className="mu-footbottom">
          <span>© 2026 Speak in Urdu. All rights reserved.</span>
          <span className="mu-urdu" aria-hidden="true">اردو سیکھیں</span>
        </div>
      </div>
    </footer>
  );
}

/* ================= pages ================= */
function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyChooseUs />
      <CoursesSection />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <Faq />
      <FinalCta />
    </>
  );
}

function PageHero({ crumb, eyebrow, title, lead, children }) {
  const { goHomeTop } = useNav();
  return (
    <section className="mu-pagehero">
      <Pattern />
      <div className="mu-wrap">
        <div className="mu-crumb">
          <button onClick={goHomeTop}>Home</button>
          {crumb.map((c, i) => (
            <React.Fragment key={i}>
              <span className="sep" aria-hidden="true">/</span>
              {c.onClick ? <button onClick={c.onClick}>{c.label}</button> : <span className="cur" aria-current="page">{c.label}</span>}
            </React.Fragment>
          ))}
        </div>
        <Reveal>
          <span className="mu-eyebrow">{eyebrow}</span>
          <h1 className="mu-h2" style={{ marginTop:14, fontSize:"clamp(30px,5vw,48px)" }}>{title}</h1>
          {lead && <p className="mu-lead">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function CoursesPage() {
  return (
    <>
      <PageHero
        crumb={[{ label:"Courses" }]}
        eyebrow="Courses"
        title="Every course, in full."
        lead="Six structured tracks for every age and goal — private 1:1 classes plus seasonal and exam-focused courses."
      />
      <section className="mu-section" style={{ paddingTop:64 }}>
        <div className="mu-wrap">
          <div className="mu-grid cols3" style={{ marginTop:0 }}>
            {COURSES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 90}>
                <CourseCard c={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function CourseDetailPage({ slug }) {
  const { goRoute, goTrial } = useNav();
  const c = COURSE_BY_SLUG[slug];
  if (!c) {
    return (
      <section className="mu-section">
        <div className="mu-wrap mu-center">
          <h1 className="mu-h2">Course not found</h1>
          <p className="mu-lead">We couldn't find that course. Browse the full list instead.</p>
          <div style={{ marginTop:24 }}>
            <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={() => goRoute("courses")}>View all courses</button>
          </div>
        </div>
      </section>
    );
  }
  const Icon = c.icon;
  const flat = c.pricingType === "flat";
  return (
    <>
      <section className="mu-pagehero">
        <Pattern />
        <div className="mu-wrap">
          <div className="mu-crumb">
            <button onClick={() => goRoute("home")}>Home</button>
            <span className="sep" aria-hidden="true">/</span>
            <button onClick={() => goRoute("courses")}>Courses</button>
            <span className="sep" aria-hidden="true">/</span>
            <span className="cur" aria-current="page">{c.name}</span>
          </div>
          <Reveal>
            <div className="mu-detail-head">
              <div className="mu-ico" style={{ width:52, height:52 }}><Icon size={26} strokeWidth={1.8} /></div>
              <h1 style={{ marginTop:14 }}>{c.name}</h1>
              <div className="chips">
                <span className="mu-chiptag"><Video size={14} /> {c.format}</span>
                <span className="mu-chiptag"><Clock size={14} /> {c.lessonLength}</span>
                {flat && <span className="mu-chiptag"><Calendar size={14} /> {c.duration} · {c.frequency}</span>}
                {c.available && <span className="mu-chiptag"><CalendarClock size={14} /> {c.available}</span>}
              </div>
              <p className="mu-lead">{c.desc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mu-wrap">
        <Photo className="mu-detail-banner" src={IMG.courses[c.slug]} art={ART.courses[c.slug]} alt={`${c.name} — a glimpse of the learning experience`} ratio="24 / 8" overlay icon={Icon} />
      </div>

      <section className="mu-section" style={{ paddingTop:48 }}>
        <div className="mu-wrap">
          <div className="mu-detail-grid">
            <div className="mu-detail-main">
              <Reveal className="mu-block">
                <h2>{c.featuresLabel}</h2>
                <ul className="mu-outcomes">
                  {c.features.map((o) => (
                    <li key={o}><Check size={20} strokeWidth={2.4} /> {o}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="mu-detail-side" aria-label="Course summary">
              <div className="card">
                {flat ? (
                  <div className="price"><span className="from">Course fee</span>{c.price}<small className="mu-currency"> USD</small><small>{c.unit}</small></div>
                ) : (
                  <>
                    <div className="price"><span className="from">From</span>{c.price}<small className="mu-currency"> USD</small><small>{c.unit}</small></div>
                    <ul className="mu-tierlist">
                      {c.tiers.map((t) => (
                        <li key={t.lessons}><span>{t.lessons} lessons/mo</span><b>${t.price} USD</b></li>
                      ))}
                    </ul>
                  </>
                )}
                <ul className="mu-facts">
                  <li><span className="k"><Video size={15} /> Format</span><span className="v">{c.format}</span></li>
                  <li><span className="k"><Clock size={15} /> Lesson length</span><span className="v">{c.lessonLength}</span></li>
                  {flat && <li><span className="k"><Calendar size={15} /> Duration</span><span className="v">{c.duration}</span></li>}
                  {flat && <li><span className="k"><Repeat size={15} /> Frequency</span><span className="v">{c.frequency}</span></li>}
                </ul>
                <div className="mu-side-cta">
                  <button className="mu-btn mu-btn-md mu-btn-primary mu-btn-block" onClick={() => goTrial(c.slug)}>{c.ctaLabel}</button>
                  <button className="mu-btn mu-btn-md mu-btn-ghost mu-btn-block" onClick={() => goRoute("pricing")}>View plans & pricing</button>
                </div>
              </div>
              <div style={{ marginTop:16 }}>
                <button className="mu-textlink" onClick={() => goRoute("courses")}><ArrowLeft size={16} /> Back to all courses</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function PricingPage() {
  const { goTrial, goRoute } = useNav();
  const [classes, setClasses] = useState(8);
  return (
    <>
      <PageHero
        crumb={[{ label:"Pricing" }]}
        eyebrow="Pricing"
        title="Private classes and structured courses."
        lead="Private 1:1 tuition for kids and women, plus structured group courses like GCSE exam prep. Every plan includes a free trial."
      >
        <div className="mu-billing">
          <span className="mu-billing-label">Classes per month for 1:1 plans</span>
          <div className="mu-billing-toggle" role="group" aria-label="Classes per month for one-to-one plans">
            {CLASS_TIERS.map((n) => (
              <button key={n} className={classes === n ? "on" : ""} onClick={() => setClasses(n)} aria-pressed={classes === n}>{n} classes</button>
            ))}
          </div>
        </div>
      </PageHero>

      <div className="mu-wrap">
        <Reveal>
          <button className="mu-paybanner" onClick={() => goRoute("payment")}>
            <span className="mu-paybanner-icon"><Globe size={22} /></span>
            <span className="mu-paybanner-text">
              <strong>Paying from abroad?</strong>
              <span>See our step-by-step guides for Remitly, Taptap Send &amp; Western Union.</span>
            </span>
            <span className="mu-paybanner-cta">How to pay <ArrowRight size={16} /></span>
          </button>
        </Reveal>
      </div>

      <section className="mu-section" style={{ paddingTop:32 }} aria-labelledby="priv-h">
        <div className="mu-wrap">
          <SectionHeader eyebrow="Private 1:1 classes" title="One-to-one, paced around you." lead={null} id="priv-h" />
          <div className="mu-pricing-grid cols2">
            {PRIVATE_PLANS.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <PlanCard plan={p} classes={classes} onCta={() => goTrial(p.courseSlug)} headingTag="h2" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mu-section" style={{ paddingTop:0 }} aria-labelledby="group-h">
        <div className="mu-wrap">
          <SectionHeader eyebrow="Group courses" title="Structured, exam-focused, seasonal." lead={null} id="group-h" />
          <div className="mu-pricing-grid cols4">
            {GROUP_PLANS.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <PlanCard plan={p} onCta={() => goTrial(p.courseSlug)} headingTag="h2" />
              </Reveal>
            ))}
          </div>
          <Reveal className="mu-center">
            <div style={{ marginTop:32 }}>
              <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={goTrial}>Start with a free trial <ArrowRight size={18} /></button>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

/* ================= payment ================= */
const PAYMENT_METHODS = [
  {
    id: "remitly",
    name: "Remitly",
    tagline: "Best for Canada, USA, UK, Australia, and many other countries",
    about: "Remitly is an international money transfer service that lets you send money safely and quickly to Pakistan, with competitive exchange rates and multiple payment methods.",
    steps: [
      "Download the Remitly app or visit the official Remitly website and sign up using your email address.",
      "Verify your identity — Remitly may ask for this, depending on your country and transfer amount.",
      "Choose Pakistan as the receiving country.",
      "Enter the amount you wish to send for your Urdu lessons.",
      "Select the delivery method: bank deposit.",
      "Enter the recipient's name and payment information exactly as provided by the Speak in Urdu team.",
      "Review all the information carefully before confirming your transfer.",
      "Email or message us your full name, the transfer reference number, the amount sent, and the payment date.",
    ],
    tips: [
      "Always verify the recipient details before sending.",
      "Keep your transfer receipt until your payment has been confirmed.",
      "Contact us if you have any questions before making your payment.",
    ],
  },
  {
    id: "taptap",
    name: "Taptap Send",
    tagline: "One of the fastest ways to send money internationally",
    about: "Taptap Send is a secure money transfer service for sending money to family members, businesses, and individuals in various countries, including Pakistan.",
    steps: [
      "Install the Taptap Send app from your device's app store.",
      "Create your account using your mobile number and complete the required verification.",
      "Choose Pakistan as the destination country.",
      "Enter the amount for your Urdu lesson payment.",
      "Enter the recipient information exactly as provided by the Speak in Urdu team.",
      "Pay using your debit card, bank account, or another payment method available in your country.",
      "Review all information carefully and send your payment.",
      "Send us your name, the payment amount, the transaction reference, and a screenshot or receipt (optional but helpful).",
    ],
    tips: [
      "If you're unsure about any step, contact us before sending your payment.",
      "We'll confirm your payment as soon as it arrives.",
    ],
  },
  {
    id: "westernunion",
    name: "Western Union",
    tagline: "A trusted international transfer service, available almost anywhere",
    about: "Western Union has been a trusted international money transfer service for many years, available through its website, mobile app, or local agent locations.",
    steps: [
      "Visit the Western Union website or download the mobile app and create an account.",
      "Choose Pakistan as the country where you are sending the payment.",
      "Enter the lesson fee you wish to pay.",
      "Select the delivery method — preferably bank deposit; if that's not available, cash pickup also works.",
      "Carefully enter the recipient's full name and payment details exactly as provided by the Speak in Urdu team.",
      "Pay using your preferred payment method and submit the transfer.",
      "Save the Money Transfer Control Number (MTCN) Western Union gives you — keep it safe.",
      "Send us your full name, the MTCN, the amount sent, and the date of transfer.",
    ],
    tips: [
      "Double-check all recipient information before sending.",
      "Keep your receipt until your payment has been confirmed.",
      "Contact us if you need assistance before making your transfer.",
    ],
  },
];

function PaymentPage() {
  const { goTrial, goRoute } = useNav();
  const [active, setActive] = useState(PAYMENT_METHODS[0].id);
  const method = PAYMENT_METHODS.find((m) => m.id === active);

  return (
    <>
      <PageHero
        crumb={[{ label:"Payment" }]}
        eyebrow="Paying from abroad"
        title="How to pay for your lessons."
        lead="We accept international bank transfers from Canada, the USA, the UK, Australia, and many other countries. Pick whichever service works best where you live."
      />

      <section className="mu-section" style={{ paddingTop:56 }}>
        <div className="mu-wrap">
          <div className="mu-paymethods" role="tablist" aria-label="Payment method">
            {PAYMENT_METHODS.map((m) => (
              <button key={m.id} role="tab" aria-selected={active === m.id}
                className={active === m.id ? "on" : ""} onClick={() => setActive(m.id)}>
                {m.name}
              </button>
            ))}
          </div>

          <Reveal key={method.id}>
            <div className="mu-paycard">
              <h2>{method.name}</h2>
              <p className="tagline">{method.tagline}</p>
              <p className="about">{method.about}</p>

              <div className="mu-paysteps">
                {method.steps.map((s, i) => (
                  <div className="mu-paystep" key={i}>
                    <span className="num">{i + 1}</span>
                    <p>{s}</p>
                  </div>
                ))}
              </div>

              <div className="mu-paytips">
                <h3>Tips for a smooth payment</h3>
                <ul>
                  {method.tips.map((t) => <li key={t}><Check size={15} strokeWidth={2.4} /> {t}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="mu-paynote">
              <ShieldCheck size={22} />
              <div>
                <h3>We don't publish recipient bank details publicly</h3>
                <p>For your security, the exact recipient name and account details are shared directly once you book a trial or get in touch — never posted openly on the website.</p>
                <div className="btns">
                  <button className="mu-btn mu-btn-md mu-btn-primary" onClick={goTrial}>Book a Free Trial</button>
                  <button className="mu-btn mu-btn-md mu-btn-ghost" onClick={() => goRoute("contact")}>Contact Us</button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

/* ================= app ================= */
/* ================= about page ================= */
function AboutPage() {
  const { goTrial } = useNav();
  return (
    <>
      <PageHero
        crumb={[{ label:"About" }]}
        eyebrow="Our story"
        title="We built the Urdu school we wished existed."
        lead="Speak in Urdu is a small team of native teachers on a simple mission: help anyone, anywhere, read, write, and speak Urdu — with warmth and real structure."
      />

      <div className="mu-wrap">
        <Photo className="mu-detail-banner" src={IMG.aboutBanner} art={ART.aboutBanner} alt="A calm study space with books and warm light" ratio="24 / 8" overlay icon={BookOpen} />
      </div>

      {/* mission + story */}
      <section className="mu-section" style={{ paddingTop:64 }} aria-labelledby="about-mission">
        <div className="mu-wrap">
          <div className="mu-about-split">
            <Reveal>
              <div>
                <span className="mu-eyebrow">Our mission</span>
                <h2 className="mu-h2" id="about-mission" style={{ marginTop:14 }}>Keep a beautiful language alive — one learner at a time.</h2>
                <p className="mu-lead" style={{ maxWidth:"none" }}>
                  For millions in the diaspora, Urdu is the sound of home: grandparents, poetry, film songs, the language of the heart. Yet good, patient teaching is hard to find far from home. We exist to close that gap — with live human teachers, a clear path, and no gimmicks.
                </p>
                <div className="mu-about-stats">
                  {STATS.map((s) => (
                    <div key={s.l} className="stat"><span className="n">{s.n}</span><span className="l">{s.l}</span></div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mu-about-timeline" aria-label="Our journey">
                {MILESTONES.map((m) => (
                  <div key={m.y} className="mu-mile">
                    <div className="yr">{m.y}</div>
                    <div className="body">
                      <h3>{m.t}</h3>
                      <p>{m.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="mu-section" style={{ background:"var(--card)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} aria-labelledby="about-values">
        <div className="mu-wrap">
          <SectionHeader center eyebrow="What we believe" title="Values that shape every class." id="about-values"
            lead="These aren't wall posters. They're how we hire teachers, design lessons, and treat every learner." />
          <div className="mu-grid cols3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={(i % 3) * 90}>
                <article className="mu-card">
                  <div className="mu-ico"><v.icon size={22} strokeWidth={1.8} /></div>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* small team */}
      <section className="mu-section" aria-labelledby="about-team">
        <div className="mu-wrap">
          <SectionHeader center eyebrow="The team behind it" title="Small team, big obsession." id="about-team"
            lead="A handful of people who care a great deal — supported by our full roster of native teachers." />
          <div className="mu-grid cols3">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={(i % 3) * 90}>
                <article className="mu-card mu-teamcard">
                  <div className="mu-avatar" role="img" aria-label={`Portrait of ${f.name}`}>{f.initials}</div>
                  <h3>{f.name}</h3>
                  <div className="role">{f.role}</div>
                  <p>{f.line}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:40, display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={goTrial}>Book a Free Trial <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

/* ================= blog ================= */
function CatPill({ cat, sm }) {
  return <span className={`mu-catpill ${sm ? "sm" : ""}`}><Tag size={sm ? 11 : 12} /> {cat}</span>;
}

function PostMeta({ post }) {
  return (
    <div className="mu-postmeta">
      <span className="au"><span className="mu-avatar tiny" aria-hidden="true">{post.author.initials}</span>{post.author.name}</span>
      <span className="dot" aria-hidden="true">·</span>
      <span><Calendar size={14} /> {post.date}</span>
      <span className="dot" aria-hidden="true">·</span>
      <span><Clock size={14} /> {post.read}</span>
    </div>
  );
}

function PostCard({ p }) {
  const { goPost } = useNav();
  return (
    <button className="mu-card mu-postcard" onClick={() => goPost(p.slug)} aria-label={`Read: ${p.title}`}>
      <Photo className="mu-postcard-media" src={IMG.blog[p.cat]} art={ART.blog[p.cat]} alt="" ratio="16 / 9" overlay icon={BookOpen} />
      <div className="mu-postcard-body">
        <CatPill cat={p.cat} sm />
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <PostMeta post={p} />
        <span className="mu-textlink">Read article <ArrowRight size={15} /></span>
      </div>
    </button>
  );
}

function BlogPage() {
  const { goPost } = useNav();
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? POSTS : POSTS.filter((p) => p.cat === cat);
  const [featured, ...rest] = list;
  return (
    <>
      <PageHero
        crumb={[{ label:"Blog" }]}
        eyebrow="The Academy blog"
        title="Read, learn, and fall for Urdu."
        lead="Practical lessons, grammar made friendly, vocabulary, poetry, culture, and travel — written by our teachers."
      />
      <section className="mu-section" style={{ paddingTop:56 }}>
        <div className="mu-wrap">
          <div className="mu-filterbar" role="group" aria-label="Filter posts by category">
            {["All", ...BLOG_CATEGORIES].map((c) => (
              <button key={c} className={`mu-filterchip ${cat === c ? "on" : ""}`}
                aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          {list.length === 0 && <p className="mu-resultcount">No posts in this category yet — check back soon.</p>}

          {featured && (
            <Reveal>
              <button className="mu-feature" onClick={() => goPost(featured.slug)} aria-label={`Read: ${featured.title}`}>
                <div className="mu-feature-body">
                  <CatPill cat={featured.cat} />
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <PostMeta post={featured} />
                  <span className="mu-textlink" style={{ marginTop:6 }}>Read article <ArrowRight size={15} /></span>
                </div>
                <div className="mu-feature-art" aria-hidden="true">
                  <Photo src={IMG.blog[featured.cat]} art={ART.blog[featured.cat]} alt="" ratio="4 / 3" overlay icon={BookOpen} />
                </div>
              </button>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mu-grid cols3" style={{ marginTop:28 }}>
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

function PostBody({ blocks }) {
  return (
    <div className="mu-article">
      {blocks.map((b, i) => {
        if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "p") return <p key={i}>{b.text}</p>;
        if (b.type === "list") return (
          <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
        );
        if (b.type === "tip") return (
          <aside key={i} className="mu-callout">
            <span className="ic"><Sparkles size={16} /></span>
            <p>{b.text}</p>
          </aside>
        );
        if (b.type === "urdu") return (
          <div key={i} className="mu-urduex">
            <span className="ur mu-urdu" lang="ur" dir="rtl">{b.ur}</span>
            <span className="tr">{b.tr}</span>
            <span className="en">{b.en}</span>
          </div>
        );
        if (b.type === "quote") return (
          <blockquote key={i} className="mu-verse">
            <span className="mu-urdu" lang="ur" dir="rtl">{b.text}</span>
            {b.by && <cite>— {b.by}</cite>}
          </blockquote>
        );
        return null;
      })}
    </div>
  );
}

function BlogPostPage({ slug }) {
  const { goRoute, goPost, goTrial } = useNav();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="mu-section" style={{ minHeight:"46vh", display:"grid", placeItems:"center", textAlign:"center" }}>
        <div className="mu-wrap">
          <span className="mu-eyebrow" style={{ justifyContent:"center" }}>Not found</span>
          <h1 className="mu-h2" style={{ marginTop:14 }}>We couldn't find that article.</h1>
          <p className="mu-lead" style={{ margin:"14px auto 24px" }}>It may have moved. Browse all articles instead.</p>
          <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={() => goRoute("blog")}>Back to blog</button>
        </div>
      </section>
    );
  }

  const related = POSTS.filter((p) => p.cat === post.cat && p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="mu-pagehero mu-posthero">
        <Pattern />
        <div className="mu-wrap mu-narrow">
          <div className="mu-crumb">
            <button onClick={() => goRoute("home")}>Home</button>
            <span className="sep" aria-hidden="true">/</span>
            <button onClick={() => goRoute("blog")}>Blog</button>
            <span className="sep" aria-hidden="true">/</span>
            <span className="cur" aria-current="page">{post.cat}</span>
          </div>
          <Reveal>
            <CatPill cat={post.cat} />
            <h1 className="mu-h2" style={{ marginTop:14, fontSize:"clamp(28px,4.6vw,44px)" }}>{post.title}</h1>
            <div style={{ marginTop:18 }}><PostMeta post={post} /></div>
          </Reveal>
        </div>
      </section>

      <article className="mu-section" style={{ paddingTop:8 }}>
        <div className="mu-wrap mu-narrow">
          <Photo className="mu-post-banner" src={IMG.blog[post.cat]} art={ART.blog[post.cat]} alt="" ratio="21 / 9" overlay icon={BookOpen} />
          <Reveal>
            <p className="mu-article-lead">{post.excerpt}</p>
            <PostBody blocks={post.body} />

            <div className="mu-post-cta">
              <div>
                <h3>Want to actually speak this?</h3>
                <p>Book a free trial and learn live with a native teacher.</p>
              </div>
              <button className="mu-btn mu-btn-lg mu-btn-primary" onClick={goTrial}>Book a Free Trial <ArrowRight size={18} /></button>
            </div>

            <button className="mu-textlink" style={{ marginTop:28 }} onClick={() => goRoute("blog")}><ArrowLeft size={16} /> Back to all articles</button>
          </Reveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mu-section" style={{ background:"var(--card)", borderTop:"1px solid var(--border)", paddingTop:64 }} aria-labelledby="related-h">
          <div className="mu-wrap">
            <h2 className="mu-h2" id="related-h" style={{ fontSize:"clamp(22px,3vw,30px)" }}>More in {post.cat}</h2>
            <div className="mu-grid cols3" style={{ marginTop:28 }}>
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 80}>
                  <PostCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ================= contact ================= */
const TIMEZONES = [
  "Select your timezone…",
  "PST — Los Angeles / Vancouver (UTC−8)",
  "MST — Denver / Phoenix (UTC−7)",
  "CST — Chicago (UTC−6)",
  "EST — New York / Toronto (UTC−5)",
  "GMT — London (UTC+0)",
  "CET — Berlin / Paris (UTC+1)",
  "GST — Dubai (UTC+4)",
  "PKT — Karachi / Lahore (UTC+5)",
  "AEST — Sydney (UTC+10)",
];

const COUNTRIES = [
  "Select your country…",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Chad", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
  "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guyana", "Haiti",
  "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius",
  "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palestine", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
  "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe", "Other",
];

function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", tz:TIMEZONES[0], message:"", website:"" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (!form.email.trim()) er.email = "We need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "That email doesn't look right.";
    if (form.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) er.phone = "That phone number doesn't look right.";
    if (!form.message.trim()) er.message = "Add a short message so we can help.";
    return er;
  };
  const submit = async () => {
    if (form.website) return; // honeypot
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) return;
    setStatus("submitting");
    try {
      const body = new URLSearchParams({ name: form.name, email: form.email, phone: form.phone, tz: form.tz, message: form.message });
      const res = await fetch("/contact.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      const data = await res.json().catch(() => ({ success: res.ok }));
      if (res.ok && data.success !== false) {
        setStatus("sent");
        setForm({ name:"", email:"", phone:"", tz:TIMEZONES[0], message:"", website:"" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        crumb={[{ label:"Contact" }]}
        eyebrow="Say salaam"
        title="Let's talk about your Urdu."
        lead="Questions about courses, scheduling, or your free trial? Send a message and a real human replies — usually within a day."
      />

      <section className="mu-section" style={{ paddingTop:56 }}>
        <div className="mu-wrap">
          <div className="mu-contact-grid">
            {/* form */}
            <Reveal>
              <div className="mu-card mu-formcard">
                <h2 className="mu-h3">Send us a message</h2>
                {status === "sent" ? (
                  <div className="mu-sent" role="status">
                    <div className="ic"><Check size={22} /></div>
                    <h3>Shukriya! Your message is on its way.</h3>
                    <p>We've received it and will reply by email shortly. For anything urgent, use the chat bubble in the corner.</p>
                    <button className="mu-btn mu-btn-md mu-btn-ghost" onClick={() => setStatus("idle")}>Send another</button>
                  </div>
                ) : (
                  <div className="mu-form" noValidate>
                    <div className="mu-field">
                      <label htmlFor="cf-name">Your name</label>
                      <input id="cf-name" type="text" value={form.name} onChange={set("name")}
                        placeholder="e.g. Sara Ahmed" aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "cf-name-err" : undefined} />
                      {errors.name && <span className="err" id="cf-name-err">{errors.name}</span>}
                    </div>
                    <div className="mu-field">
                      <label htmlFor="cf-email">Email</label>
                      <input id="cf-email" type="email" value={form.email} onChange={set("email")}
                        placeholder="you@email.com" aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "cf-email-err" : undefined} />
                      {errors.email && <span className="err" id="cf-email-err">{errors.email}</span>}
                    </div>
                    <div className="mu-field">
                      <label htmlFor="cf-phone">Phone number <span className="hint-plain">(optional)</span></label>
                      <input id="cf-phone" type="tel" value={form.phone} onChange={set("phone")}
                        placeholder="e.g. +92 300 1234567" aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "cf-phone-err" : undefined} />
                      {errors.phone && <span className="err" id="cf-phone-err">{errors.phone}</span>}
                    </div>
                    <div className="mu-field">
                      <label htmlFor="cf-tz">Preferred timezone</label>
                      <div className="mu-selectwrap">
                        <select id="cf-tz" value={form.tz} onChange={set("tz")}>
                          {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown size={18} aria-hidden="true" />
                      </div>
                      <span className="hint">Helps us suggest class times that suit you.</span>
                    </div>
                    <div className="mu-field">
                      <label htmlFor="cf-msg">Message</label>
                      <textarea id="cf-msg" rows={5} value={form.message} onChange={set("message")}
                        placeholder="Tell us your goals, questions, or which course you're curious about."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "cf-msg-err" : undefined} />
                      {errors.message && <span className="err" id="cf-msg-err">{errors.message}</span>}
                    </div>
                    <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="mu-hp" aria-hidden="true" />
                    {status === "error" && <p className="err" role="alert">Something went wrong sending your message — please try again, or email us directly.</p>}
                    <button type="button" className="mu-btn mu-btn-lg mu-btn-primary mu-btn-block" onClick={submit} disabled={status === "submitting"}>
                      {status === "submitting" ? "Sending…" : <>Send message <Send size={17} /></>}
                    </button>
                    <p className="mu-formnote">By sending, you agree we may email you back. We never share your details.</p>
                  </div>
                )}
              </div>
            </Reveal>

            {/* info */}
            <Reveal delay={120}>
              <div className="mu-contactinfo">
                <Photo className="mu-contact-photo" src={IMG.contact} art={ART.contact} alt="A cozy tea moment — how we like our conversations" ratio="16 / 9" overlay icon={Heart} />
                <div className="mu-card">
                  <h3 className="mu-h3" style={{ marginBottom:16 }}>Reach us directly</h3>
                  <a className="mu-inforow" href="mailto:info@speakinurdu.com">
                    <span className="ic"><Mail size={18} /></span>
                    <span><span className="k">Email</span><span className="v">info@speakinurdu.com</span></span>
                  </a>
                  <a className="mu-inforow" href="tel:+923275347525">
                    <span className="ic"><Phone size={18} /></span>
                    <span><span className="k">Phone</span><span className="v">+92 327 5347525</span></span>
                  </a>
                  <div className="mu-inforow">
                    <span className="ic"><Clock size={18} /></span>
                    <span><span className="k">Support hours</span><span className="v">Every day, 8am–11pm PKT</span></span>
                  </div>
                  <div className="mu-infosocials">
                    <span className="k">Follow along</span>
                    <div className="mu-socials tight">
                      <a href="https://www.instagram.com/speakinurdu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
                      <a href="https://www.facebook.com/profile.php?id=61590513969029" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
                      <a href="https://www.youtube.com/@SpeakinUrdu" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
                      <a href="#/contact" aria-label="LinkedIn"><Linkedin size={18} /></a>
                    </div>
                  </div>
                </div>

                {/* map embed placeholder */}
                <div className="mu-map" role="img" aria-label="Map location placeholder — Speak in Urdu is fully online">
                  <Pattern />
                  <div className="mu-map-inner">
                    <span className="pin"><MapPin size={26} /></span>
                    <strong>Map embed placeholder</strong>
                    <span>We're fully online — drop an embedded map here (Google Maps / Mapbox iframe) if you open a physical office.</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= floating whatsapp ================= */
function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* ================= chat bot ================= */
const CHAT_KB = [
  ...FAQ.map((f) => ({ q: f.q, a: f.a })),
  ...COURSES.map((c) => ({
    q: `${c.name} price and details`,
    a: `${c.name}: ${c.desc} ${c.pricingType === "flat"
      ? `Cost: ${c.price} USD${c.unit} — ${c.duration}, ${c.frequency}.`
      : `Cost: from ${c.price} USD${c.unit}, depending on how many lessons a month.`} ${c.featuresLabel}: ${c.features.join(", ")}.`,
  })),
  {
    q: "How do I pay for lessons from abroad? Payment methods Remitly Taptap Send Western Union bank transfer international",
    a: `We accept international bank transfers to Pakistan via Remitly, Taptap Send, or Western Union — whichever is available where you live. See the "How to Pay" page (linked in the footer) for step-by-step guides for each. Recipient details are shared privately once you book a trial or contact us, not published on the site.`,
  },
];

function findChatAnswer(query) {
  const words = query.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
  if (words.length === 0) return null;
  let best = null, bestScore = 0;
  for (const entry of CHAT_KB) {
    const text = (entry.q + " " + entry.a).toLowerCase();
    let score = 0;
    for (const w of words) if (text.includes(w)) score++;
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  return bestScore > 0 ? best : null;
}

const CHAT_SUGGESTIONS = [
  "Is the trial really free?",
  "How much are classes?",
  "What courses do you offer?",
  "Can I choose my class times?",
];

const CHAT_GREETING = "Assalam-o-Alaikum! I can answer quick questions about courses, pricing, and trials. Ask me anything, or pick one below.";

function ChatWidget() {
  const { goTrial, goRoute } = useNav();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: CHAT_GREETING }]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(t); };
  }, [open]);

  const ask = (text) => {
    const q = text.trim();
    if (!q) return;
    const match = findChatAnswer(q);
    setMessages((m) => [
      ...m,
      { from: "user", text: q },
      match
        ? { from: "bot", text: match.a }
        : { from: "bot", text: "I don't have a ready answer for that — here's how to reach a real person:", fallback: true },
    ]);
    setInput("");
  };

  return (
    <div className="mu-chat-root">
      {open && (
        <div className="mu-chat-panel" role="dialog" aria-label="Chat with Speak in Urdu">
          <div className="mu-chat-head">
            <div>
              <b>Speak in Urdu</b>
              <span>Usually answers instantly</span>
            </div>
            <button className="mu-chat-close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={17} /></button>
          </div>
          <div className="mu-chat-list" ref={listRef}>
            {messages.map((m, i) => (
              <div className={`mu-chat-msg ${m.from}`} key={i}>
                <p>{m.text}</p>
                {m.fallback && (
                  <div className="mu-chat-actions">
                    <button onClick={() => { setOpen(false); goTrial(); }}>Book a Free Trial</button>
                    <button onClick={() => { setOpen(false); goRoute("contact"); }}>Contact us</button>
                    <a href="https://wa.me/923275347525" target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon size={14} /> WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
            {messages.length === 1 && (
              <div className="mu-chat-suggestions">
                {CHAT_SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>
          <form className="mu-chat-input" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a question…" />
            <button type="submit" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
      <button className="mu-chat-toggle" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close chat" : "Open chat"}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollUp = () => window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
  return (
    <button className={`mu-totop ${show ? "show" : ""}`} onClick={scrollUp}
      aria-label="Back to top" tabIndex={show ? 0 : -1}>
      <ArrowUp size={20} />
    </button>
  );
}

/* ================= book trial modal ================= */
const emptyBooking = { name:"", email:"", phone:"", age:"", gender:"", country:COUNTRIES[0], timezone:TIMEZONES[0], classTime:"", courseSlug:"", website:"" };

function BookTrialModal({ open, onClose, presetCourseSlug }) {
  const [form, setForm] = useState(emptyBooking);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setForm({ ...emptyBooking, courseSlug: presetCourseSlug || "" });
    setErrors({});
    setStatus("idle");
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose, presetCourseSlug]);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please tell us your name.";
    if (!form.email.trim()) er.email = "We need an email to confirm your trial.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "That email doesn't look right.";
    if (!form.phone.trim()) er.phone = "Please add a phone number.";
    else if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) er.phone = "That phone number doesn't look right.";
    const age = Number(form.age);
    if (!form.age) er.age = "Please add your age.";
    else if (!Number.isFinite(age) || age < 5 || age > 99) er.age = "Age must be between 5 and 99.";
    if (!form.gender) er.gender = "Please select an option.";
    if (form.country === COUNTRIES[0]) er.country = "Please select your country.";
    if (form.timezone === TIMEZONES[0]) er.timezone = "Please select your timezone.";
    if (!form.courseSlug) er.courseSlug = "Please choose a course.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot — bots fill hidden fields, humans never see it
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length > 0) return;
    setStatus("submitting");
    try {
      const body = new URLSearchParams({
        name: form.name,
        email: form.email,
        phone: form.phone,
        age: form.age,
        gender: form.gender,
        country: form.country,
        timezone: form.timezone,
        classTime: form.classTime,
        course: COURSE_BY_SLUG[form.courseSlug]?.name || form.courseSlug,
      });
      const res = await fetch("/book-trial.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const data = await res.json().catch(() => ({ success: res.ok }));
      setStatus(res.ok && data.success !== false ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mu-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="mu-modal" role="dialog" aria-modal="true" aria-labelledby="booktrial-title">
        <button className="mu-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {status === "sent" ? (
          <div className="mu-sent" role="status">
            <div className="ic"><Check size={22} /></div>
            <h3 id="booktrial-title">Shukriya! Your trial request is in.</h3>
            <p>We'll email you within one business day to confirm your class time.</p>
            <button className="mu-btn mu-btn-md mu-btn-primary" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="mu-form" onSubmit={submit} noValidate>
            <h3 id="booktrial-title" className="mu-modal-title">Book your free trial</h3>
            <p className="mu-modal-sub">Tell us a bit about you and we'll match you with the right teacher.</p>

            <div className="mu-field-row">
              <div className={`mu-field ${errors.name ? "err" : ""}`}>
                <label htmlFor="bt-name">Full name</label>
                <input id="bt-name" ref={firstFieldRef} type="text" value={form.name} onChange={set("name")} placeholder="e.g. Sara Ahmed" />
                {errors.name && <span className="err">{errors.name}</span>}
              </div>
              <div className={`mu-field ${errors.email ? "err" : ""}`}>
                <label htmlFor="bt-email">Email</label>
                <input id="bt-email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" />
                {errors.email && <span className="err">{errors.email}</span>}
              </div>
            </div>

            <div className={`mu-field ${errors.phone ? "err" : ""}`}>
              <label htmlFor="bt-phone">Phone number</label>
              <input id="bt-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="e.g. +92 300 1234567" />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>

            <div className="mu-field-row">
              <div className={`mu-field ${errors.age ? "err" : ""}`}>
                <label htmlFor="bt-age">Age</label>
                <input id="bt-age" type="number" min="5" max="99" value={form.age} onChange={set("age")} placeholder="e.g. 27" />
                {errors.age && <span className="err">{errors.age}</span>}
              </div>
              <div className={`mu-field ${errors.gender ? "err" : ""}`}>
                <label htmlFor="bt-gender">Gender</label>
                <div className="mu-selectwrap">
                  <select id="bt-gender" value={form.gender} onChange={set("gender")}>
                    <option value="">Select…</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <ChevronDown size={18} aria-hidden="true" />
                </div>
                {errors.gender && <span className="err">{errors.gender}</span>}
              </div>
            </div>

            <div className={`mu-field ${errors.country ? "err" : ""}`}>
              <label htmlFor="bt-country">Country of residence</label>
              <div className="mu-selectwrap">
                <select id="bt-country" value={form.country} onChange={set("country")}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
              {errors.country && <span className="err">{errors.country}</span>}
            </div>

            <div className={`mu-field ${errors.timezone ? "err" : ""}`}>
              <label htmlFor="bt-tz">Timezone</label>
              <div className="mu-selectwrap">
                <select id="bt-tz" value={form.timezone} onChange={set("timezone")}>
                  {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
              {errors.timezone && <span className="err">{errors.timezone}</span>}
            </div>

            <div className="mu-field">
              <label htmlFor="bt-time">Preferred class time</label>
              <input id="bt-time" type="text" value={form.classTime} onChange={set("classTime")} placeholder="e.g. Weekday evenings, 6–8 PM" />
              <span className="hint-plain">Optional — a rough idea is fine, we'll confirm exact times with you.</span>
            </div>

            <div className={`mu-field ${errors.courseSlug ? "err" : ""}`}>
              <label htmlFor="bt-course">Which course?</label>
              <div className="mu-selectwrap">
                <select id="bt-course" value={form.courseSlug} onChange={set("courseSlug")}>
                  <option value="">Select a course…</option>
                  {COURSES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
              {errors.courseSlug && <span className="err">{errors.courseSlug}</span>}
            </div>

            <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="mu-hp" aria-hidden="true" />

            {status === "error" && <p className="err" role="alert">Something went wrong sending your request — please try again, or email us directly.</p>}

            <button type="submit" className="mu-btn mu-btn-lg mu-btn-primary mu-btn-block" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : <>Request Free Trial <ArrowRight size={18} /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ================= SEO ================= */
const SITE_NAME = "Speak in Urdu";
const SITE_TAGLINE = "Learn Urdu Online with Native Teachers";
const SITE_DESC = "Live 1-on-1 online Urdu classes with native teachers. Private lessons for kids and women, plus GCSE exam prep and seasonal Urdu courses, with a free trial class.";

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

const orgLD = () => ({
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  description: SITE_DESC,
  url: typeof window !== "undefined" ? window.location.origin + window.location.pathname : "",
  email: "info@speakinurdu.com",
  telephone: "+923275347525",
});

const courseLD = (c) => ({
  "@type": "Course",
  name: c.name,
  description: c.desc,
  provider: { "@type": "EducationalOrganization", name: SITE_NAME },
  hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: c.duration || "Ongoing" },
  offers: { "@type": "Offer", price: (c.price || "").replace(/[^0-9.]/g, "") || undefined, priceCurrency: "USD", category: "Paid" },
});

function seoFor(route) {
  const t = (s) => `${s} | ${SITE_NAME}`;
  switch (route.name) {
    case "courses":
      return { title: t("Online Urdu Courses — Kids, Women & Exam Prep"),
        desc: "Six Urdu courses: private 1:1 classes for kids and women, GCSE exam preparation, Read & Write Urdu, and seasonal Summer and Back-to-School courses. Live classes with native teachers.",
        ld: [orgLD(), { "@type": "ItemList", name: "Urdu Courses", itemListElement: COURSES.map((c, i) => ({ "@type": "ListItem", position: i + 1, item: courseLD(c) })) }] };
    case "course": {
      const c = COURSE_BY_SLUG[route.slug];
      if (!c) return { title: t("Course not found"), desc: SITE_DESC, ld: [orgLD()] };
      return { title: t(`${c.name} — Online Urdu Course`), desc: c.desc, ld: [orgLD(), courseLD(c)] };
    }
    case "pricing":
      return { title: t("Pricing & Plans — 1:1 Classes & Urdu Courses"),
        desc: "Private 1:1 Urdu tuition for kids (from $32/mo USD) and women (from $48/mo USD), plus GCSE exam prep ($79 USD), Read & Write Urdu ($60 USD), and seasonal Summer and Back-to-School courses ($55 USD each). Every plan starts with a free trial.",
        ld: [orgLD(), { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] };
    case "payment":
      return { title: t("How to Pay — Remitly, Taptap Send & Western Union"),
        desc: "Step-by-step guides for paying your Urdu lesson fees from abroad via Remitly, Taptap Send, or Western Union, with international bank transfer to Pakistan.",
        ld: [orgLD()] };
    case "about":
      return { title: t("About Us — Our Story & Mission"),
        desc: "Speak in Urdu is a small team of native teachers helping learners in 40+ countries read, write, and speak Urdu with structure and warmth.",
        ld: [orgLD(), { "@type": "AboutPage", name: t("About Us"), about: orgLD() }] };
    case "blog":
      return { title: t("Urdu Learning Blog — Tips, Grammar & Poetry"),
        desc: "Practical guides for learning Urdu: alphabet, grammar, vocabulary, classical poetry, culture, and travel phrases — written by native teachers.",
        ld: [orgLD(), { "@type": "Blog", name: `${SITE_NAME} Blog`, blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, articleSection: p.cat })) }] };
    case "post": {
      const p = POSTS.find((x) => x.slug === route.slug);
      if (!p) return { title: t("Article not found"), desc: SITE_DESC, ld: [orgLD()] };
      let iso; try { iso = new Date(p.date).toISOString().slice(0, 10); } catch { iso = undefined; }
      return { title: t(p.title), desc: p.excerpt,
        ld: [orgLD(), { "@type": "BlogPosting", headline: p.title, description: p.excerpt, datePublished: iso,
          author: { "@type": "Person", name: p.author.name }, articleSection: p.cat,
          publisher: { "@type": "Organization", name: SITE_NAME } }] };
    }
    case "contact":
      return { title: t("Contact Us — Book a Free Trial Class"),
        desc: "Questions about learning Urdu? Message us, email info@speakinurdu.com, or book a free trial class. We reply within one business day.",
        ld: [orgLD(), { "@type": "ContactPage", name: t("Contact Us") }] };
    default:
      return { title: `${SITE_NAME} — ${SITE_TAGLINE}`, desc: SITE_DESC,
        ld: [orgLD(), { "@type": "ItemList", name: "Urdu Courses", itemListElement: COURSES.map((c, i) => ({ "@type": "ListItem", position: i + 1, item: courseLD(c) })) }] };
  }
}

function useSEO(route) {
  useEffect(() => {
    const { title, desc, ld } = seoFor(route);
    document.title = title;
    document.documentElement.lang = "en";
    if (!document.head.querySelector('meta[name="viewport"]')) {
      const v = document.createElement("meta");
      v.name = "viewport"; v.content = "width=device-width, initial-scale=1";
      document.head.appendChild(v);
    }
    upsertMeta("name", "description", desc);
    upsertMeta("name", "theme-color", "#1F4D3A");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:type", route.name === "post" ? "article" : "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    let s = document.getElementById("mu-jsonld");
    if (!s) { s = document.createElement("script"); s.id = "mu-jsonld"; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": ld });
  }, [route.name, route.slug]);
}

export default function App() {
  const [route, setRoute] = useState(parseHash);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialCourseSlug, setTrialCourseSlug] = useState("");

  useEffect(() => {
    const on = () => setRoute(parseHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const setHash = (h) => {
    if (window.location.hash === h) setRoute(parseHash());
    else window.location.hash = h;
  };
  const goRoute = useCallback((name) => setHash(name === "home" ? "#/" : `#/${name}`), []);
  const goCourse = useCallback((slug) => setHash(`#/courses/${slug}`), []);
  const goPost = useCallback((slug) => setHash(`#/blog/${slug}`), []);
  const goHomeTop = useCallback(() => { setPendingScroll("__top"); setHash("#/"); }, []);
  const goSection = useCallback((id) => { setPendingScroll(id); if (parseHash().name !== "home") setHash("#/"); }, []);
  const goTrial = useCallback((slug) => { setTrialCourseSlug(slug || ""); setTrialOpen(true); }, []);

  // handle pending in-page scroll once home is mounted; otherwise scroll to top on route change
  useEffect(() => {
    const behavior = reducedMotion() ? "auto" : "smooth";
    if (pendingScroll) {
      if (route.name === "home") {
        requestAnimationFrame(() => {
          if (pendingScroll === "__top") window.scrollTo({ top: 0, behavior });
          else {
            const el = document.getElementById(pendingScroll);
            if (el) el.scrollIntoView({ behavior, block: "start" });
            else window.scrollTo({ top: 0, behavior });
          }
          setPendingScroll(null);
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
      const main = document.getElementById("main-content");
      if (main) main.focus({ preventScroll: true });
    }
    // eslint-disable-next-line
  }, [route.name, route.slug]);

  useSEO(route);

  const ctx = { route, goRoute, goCourse, goPost, goHomeTop, goSection, goTrial };

  return (
    <Nav.Provider value={ctx}>
      <div className="mu-root">
        <Styles />
        <a className="mu-skip" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {route.name === "home" && <HomePage />}
          {route.name === "courses" && <CoursesPage />}
          {route.name === "course" && <CourseDetailPage slug={route.slug} />}
          {route.name === "pricing" && <PricingPage />}
          {route.name === "payment" && <PaymentPage />}
          {route.name === "about" && <AboutPage />}
          {route.name === "blog" && <BlogPage />}
          {route.name === "post" && <BlogPostPage slug={route.slug} />}
          {route.name === "contact" && <ContactPage />}
        </main>
        <Footer />
        <div className="mu-float-stack">
          <ChatWidget />
          <BackToTop />
        </div>
        <BookTrialModal open={trialOpen} onClose={() => setTrialOpen(false)} presetCourseSlug={trialCourseSlug} />
      </div>
    </Nav.Provider>
  );
}
