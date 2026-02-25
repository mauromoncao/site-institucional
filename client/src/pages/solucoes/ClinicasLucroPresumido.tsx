import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { useSettings } from "@/hooks/useSettings";
import { VideoEmbed } from "@/components/VideoEmbed";
import { CheckCircle, FileText, Shield, MessageCircle, Phone, ChevronDown, Award, Play, Lock, TrendingUp, Stethoscope, ArrowRight, Building2, Search } from "lucide-react";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
const GOLD="#E8B84B",NAVY="#19385C",WA="5586994820054";
const WA_MSG=encodeURIComponent("Olá! Vi a página sobre a tese tributária para clínicas no Lucro Presumido e gostaria de analisar minha situação.");
function StickyCTA(){const[v,setV]=useState(false);useEffect(()=>{const h=()=>setV(window.scrollY>400);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);return(<div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${v?"translate-y-0":"translate-y-full"}`} style={{background:NAVY,borderTop:`2px solid ${GOLD}`}}><div className="flex gap-2 p-3"><a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{background:"#25D366",color:"#fff"}}><MessageCircle className="w-4 h-4"/>WhatsApp</a><a href="#formulario" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{background:GOLD,color:NAVY}}><FileText className="w-4 h-4"/>Analisar Clínica</a></div></div>);}
function FaqItem({q,a}:{q:string;a:string}){const[o,setO]=useState(false);return(<div className="rounded-2xl overflow-hidden border transition-all" style={{borderColor:o?`${GOLD}40`:"rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)"}}><button onClick={()=>setO(!o)} className="w-full flex items-center justify-between px-6 py-4 text-left"><span className="text-white font-semibold text-sm pr-4">{q}</span><ChevronDown className="w-5 h-5 shrink-0 transition-transform" style={{color:GOLD,transform:o?"rotate(180deg)":"rotate(0deg)"}}/></button>{o&&<div className="px-6 pb-5"><p className="text-white/70 text-sm leading-relaxed">{a}</p></div>}</div>);}
function Formulario(){const[f,setF]=useState({nome:"",whatsapp:"",tipo:"",faturamento:"",cidade:""});const[s,setS]=useState(false);const h=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setF({...f,[e.target.name]:e.target.value});const sub=(e:React.FormEvent)=>{e.preventDefault();window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Olá! Quero analisar a tese tributária para clínicas no Lucro Presumido.\n\n📋 *Clínica/Estabelecimento:* ${f.nome}\n🏥 *Tipo:* ${f.tipo}\n💰 *Faturamento anual:* ${f.faturamento}\n📍 *Cidade/UF:* ${f.cidade}`)}`, "_blank");setS(true);};if(s)return(<div className="text-center py-12"><CheckCircle className="w-16 h-16 mx-auto mb-4" style={{color:GOLD}}/><h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3><p className="text-white/70 text-sm">Nossa equipe iniciará a análise de viabilidade da tese para sua clínica.</p></div>);
return(<form onSubmit={sub} className="space-y-4">{[{name:"nome",label:"Nome da Clínica / Estabelecimento",placeholder:"Sua clínica ou empresa",type:"text"},{name:"whatsapp",label:"WhatsApp",placeholder:"(86) 99999-9999",type:"tel"},{name:"faturamento",label:"Faturamento anual aproximado",placeholder:"Ex: R$ 1.800.000",type:"text"},{name:"cidade",label:"Cidade / UF",placeholder:"Ex: Parnaíba – PI",type:"text"}].map(fi=>(<div key={fi.name}><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{fi.label}</label><input required type={fi.type} name={fi.name} placeholder={fi.placeholder} value={(f as any)[fi.name]} onChange={h} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all" style={{background:"rgba(255,255,255,0.08)",border:"1.5px solid rgba(232,184,75,0.25)",color:"#fff"}} onFocus={e=>(e.target.style.borderColor=GOLD)} onBlur={e=>(e.target.style.borderColor="rgba(232,184,75,0.25)")}/></div>))}<div><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de estabelecimento</label><select name="tipo" value={f.tipo} onChange={h} required className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background:"#0f2340",border:"1.5px solid rgba(232,184,75,0.25)",color:f.tipo?"#fff":"#ffffff60"}}><option value="" disabled>Selecione...</option><option>Clínica médica</option><option>Clínica odontológica</option><option>Clínica multiprofissional</option><option>Centro de saúde</option><option>Laboratório de análises</option><option>Outro estabelecimento de saúde</option></select></div><button type="submit" className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2" style={{background:GOLD,color:NAVY}}>Quero analisar a viabilidade da tese →</button><p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p></form>);}
export default function ClinicasLucroPresumido(){const { settings } = useSettings();return(<SiteLayout>
      <SEOHead
        title="Clínicas no Lucro Presumido — Tese Tributária para Redução de ISS e IR"
        description="Clínicas médicas e odontológicas no Lucro Presumido podem reduzir legalmente ISS, IRPJ e CSLL. Conheça a tese e veja quanto sua clínica pode economizar."
        canonical="https://mauromoncao.adv.br/solucoes/clinicas-lucro-presumido"
        keywords="clínica lucro presumido, tese tributária clínica, redução ISS médico, IRPJ clínica médica"
        jsonLd={[
          buildServiceLD({ name: "Clínicas no Lucro Presumido — Tese Tributária para Redução de ISS e IR", description: "Clínicas médicas e odontológicas no Lucro Presumido podem reduzir legalmente ISS, IRPJ e CSLL. Conheça a tese e veja quanto sua clínica pode economizar.", url: "https://mauromoncao.adv.br/solucoes/clinicas-lucro-presumido" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Clínicas no Lucro Presumido", url: "/solucoes/clinicas-lucro-presumido" }]),
          buildOrganizationLD(),
        ]}
      />
<StickyCTA/>
<section className="relative overflow-hidden text-white" style={{minHeight:"92vh",display:"flex",alignItems:"center"}}>
  <div className="absolute inset-0"><img src="/lp-clinicas-lucro-presumido-hero.jpg" alt="" className="w-full h-full object-cover object-center"/><div className="absolute inset-0" style={{background:"linear-gradient(90deg,rgba(7,24,46,0.97) 0%,rgba(7,24,46,0.88) 45%,rgba(7,24,46,0.30) 100%)"}}/><div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(7,24,46,0.85) 0%,transparent 40%)"}}/></div>
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{backgroundImage:`linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`,backgroundSize:"72px 72px"}}/>
  <div className="container relative z-10 py-20"><div className="grid lg:grid-cols-2 gap-12 items-center"><div>
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{background:`${GOLD}15`,border:`1px solid ${GOLD}50`,color:GOLD}}><Stethoscope className="w-3.5 h-3.5"/>Direito Tributário · Clínicas · Tese do Lucro Presumido</div>
    <h1 className="font-serif font-bold leading-[1.1] text-white mb-6" style={{fontSize:"clamp(1.8rem,3.5vw,2.9rem)"}}>Sua clínica pode estar pagando <em className="not-italic" style={{color:GOLD}}>tributos além do necessário no Lucro Presumido.</em></h1>
    <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">A tese de equiparação a serviços hospitalares pode reduzir significativamente a base de cálculo de tributos e gerar <strong className="text-white">recuperação de valores pagos indevidamente</strong>, mediante análise técnica individualizada.</p>
    <div className="flex flex-wrap gap-5 mb-10">{[{icon:Shield,text:"Base jurídica e jurisprudencial sólida"},{icon:Award,text:"+15 anos em direito tributário"},{icon:Search,text:"Análise individualizada de viabilidade"}].map(({icon:Icon,text})=>(<div key={text} className="flex items-center gap-2 text-sm text-white/75"><Icon className="w-4 h-4 shrink-0" style={{color:GOLD}}/>{text}</div>))}</div>
    <div className="flex flex-wrap gap-3">
      <a href="#formulario" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg" style={{background:GOLD,color:NAVY}}><FileText className="w-4 h-4"/>Analisar viabilidade da tese</a>
      <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{borderColor:"rgba(255,255,255,0.25)",color:"rgba(255,255,255,0.9)"}}><MessageCircle className="w-4 h-4"/>Falar com especialista</a>
    </div>
  </div>
  <div className="hidden lg:flex flex-col gap-4 items-end"><div className="w-72 rounded-3xl p-6 shadow-2xl" style={{background:"rgba(7,24,46,0.80)",border:`1.5px solid ${GOLD}40`,backdropFilter:"blur(16px)"}}>
    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{color:GOLD}}>Pode se enquadrar na tese</p>
    <div className="space-y-3">{["Clínica médica no Lucro Presumido","Clínica odontológica estruturada","Centro multiprofissional de saúde","Laboratório de análises clínicas","Estabelecimento com estrutura hospitalar"].map(item=>(<div key={item} className="flex items-center gap-2.5"><div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{background:`${GOLD}25`}}><CheckCircle className="w-3.5 h-3.5" style={{color:GOLD}}/></div><span className="text-white/85 text-sm">{item}</span></div>))}</div>
    <div className="mt-5 pt-4 border-t" style={{borderColor:`${GOLD}25`}}><a href="#formulario" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all" style={{background:GOLD,color:NAVY}}><ArrowRight className="w-4 h-4"/>Verificar minha clínica</a></div>
  </div></div></div></div>
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown className="w-6 h-6 text-white/30"/></div>
</section>

<section className="py-20 bg-white"><div className="container max-w-4xl">
  <div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>O Problema</span><h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{color:NAVY}}>Clínicas tributadas como prestadoras de serviço simples <span style={{color:GOLD}}>pagam mais do que deveriam.</span></h2></div>
  <div className="grid md:grid-cols-2 gap-5 mb-10">{[
    {icon:Building2,title:"Base de cálculo diferenciada para serviços hospitalares",text:"A legislação prevê percentual de presunção de lucro menor para serviços de natureza hospitalar, gerando carga tributária significativamente inferior."},
    {icon:Search,title:"A maioria das clínicas não sabe que pode se enquadrar",text:"Muitos estabelecimentos de saúde são tributados como serviço comum quando poderiam se beneficiar do enquadramento hospitalar no Lucro Presumido."},
    {icon:TrendingUp,title:"Diferença tributária que acumula mês a mês",text:"A tributação incorreta ao longo dos anos representa um excesso que pode ser objeto de revisão e eventual pedido de recuperação de valores."},
    {icon:Stethoscope,title:"Requisitos técnicos e jurídicos específicos",text:"A tese exige análise minuciosa da estrutura da clínica, dos serviços prestados e do enquadramento legal. Não é automática — precisa de fundamentação técnica sólida."},
  ].map(({icon:Icon,title,text})=>(<div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{borderColor:"#e5e7eb",background:"#fafaf9"}}><div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:`${NAVY}10`}}><Icon className="w-5 h-5" style={{color:NAVY}}/></div><div><h3 className="font-bold text-sm mb-1" style={{color:NAVY}}>{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{text}</p></div></div>))}</div>
  <div className="rounded-2xl p-6 text-center" style={{background:`linear-gradient(135deg,#0f2340,${NAVY})`,border:`1px solid ${GOLD}30`}}><p className="text-white font-serif text-xl font-bold">"O problema não é o quanto sua clínica fatura. <span style={{color:GOLD}}>É como ela é classificada pelo Fisco."</span></p></div>
</div></section>

<section className="py-20 text-white" style={{background:`linear-gradient(135deg,#0b1e35,${NAVY})`}}><div className="container max-w-5xl">
  <div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>Base Jurídica</span><h2 className="font-serif text-3xl font-bold text-white mb-4">Tese fundamentada em <span style={{color:GOLD}}>legislação e jurisprudência</span></h2></div>
  <div className="grid md:grid-cols-2 gap-4 mb-10">{["RIR/2018 e IN RFB – percentuais diferenciados para serviços hospitalares no Lucro Presumido (8% em vez de 32%)","STJ – posição favorável ao enquadramento de clínicas como estabelecimentos hospitalares em determinadas condições","Requisitos: estrutura física adequada, internação ou procedimentos invasivos, equipe multiprofissional","Possibilidade de recuperação de IRPJ e CSLL recolhidos a maior nos últimos 5 anos","Análise individualizada da estrutura, dos serviços prestados e do CNAE cadastrado na Receita Federal","Jurisprudência do CARF e dos Tribunais Regionais Federais sobre a extensão da tese"].map((item,i)=>(<div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${GOLD}20`}}><div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm" style={{background:`${GOLD}20`,color:GOLD}}>{i+1}</div><span className="text-white/85 text-sm font-medium">{item}</span></div>))}</div>
  <div className="rounded-2xl p-6 text-center" style={{background:`${GOLD}12`,border:`1.5px solid ${GOLD}40`}}><p className="font-serif text-lg font-bold text-white">"A tese existe. A jurisprudência apoia. <span style={{color:GOLD}}>A análise técnica define se sua clínica se enquadra."</span></p></div>
</div></section>

<section className="py-20 bg-white"><div className="container max-w-5xl">
  <div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>Nossa Atuação</span><h2 className="font-serif text-3xl font-bold mb-4" style={{color:NAVY}}>Como analisamos e conduzimos a tese</h2></div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{[
    {n:"01",title:"Análise de elegibilidade",text:"Estudo detalhado da estrutura da clínica, serviços prestados, CNAE, equipe e infraestrutura para verificar o enquadramento."},
    {n:"02",title:"Revisão das declarações",text:"Levantamento das declarações e recolhimentos de IRPJ e CSLL dos últimos 5 anos para calcular o potencial de recuperação."},
    {n:"03",title:"Elaboração da fundamentação jurídica",text:"Construção da tese com base na legislação aplicável, jurisprudência favorável do STJ e do CARF."},
    {n:"04",title:"Pedido administrativo (PER/DCOMP)",text:"Protocolo do pedido de restituição ou compensação na Receita Federal, quando tecnicamente viável."},
    {n:"05",title:"Ação judicial, se necessário",text:"Ingresso com ação de repetição de indébito tributário quando o caminho administrativo não for suficiente."},
    {n:"06",title:"Adequação prospectiva",text:"Orientação para que os recolhimentos futuros já reflitam o enquadramento correto, com segurança jurídica."},
  ].map(({n,title,text})=>(<div key={n} className="rounded-2xl p-6 border hover:shadow-md transition-all" style={{borderColor:`${GOLD}25`,background:"#fafaf9"}}><div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4" style={{background:NAVY,color:GOLD}}>{n}</div><h3 className="font-bold text-sm mb-2" style={{color:NAVY}}>{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{text}</p></div>))}</div>
</div></section>

<section className="py-20" style={{background:"#f7f5f0"}}><div className="container max-w-3xl">
  <div className="text-center mb-8"><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>Entenda a Tese</span><h2 className="font-serif text-2xl font-bold mb-3" style={{color:NAVY}}>Como clínicas podem pagar menos tributos<br/>legalmente no Lucro Presumido.</h2></div>
  <VideoEmbed videoUrl={settings.video_clinicas} title="Tese para Clínicas" caption="Dr. Mauro Monção explica a tese de equiparação hospitalar para clínicas no Lucro Presumido." />
</div></section>

<section className="py-20 text-white" style={{background:`linear-gradient(135deg,#0b1e35,${NAVY})`}}><div className="container max-w-3xl">
  <div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>Dúvidas Frequentes</span><h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2></div>
  <div className="space-y-3">{[
    {q:"Minha clínica odontológica pode se beneficiar da tese?",a:"Possivelmente. A jurisprudência tem reconhecido o enquadramento para clínicas odontológicas que apresentam estrutura equivalente a serviços hospitalares. A análise individualizada da estrutura e dos serviços prestados é indispensável."},
    {q:"Qual a diferença tributária entre 8% e 32% de presunção de lucro?",a:"No Lucro Presumido, a alíquota de presunção impacta diretamente a base de cálculo do IRPJ e da CSLL. A diferença entre 8% e 32% pode representar uma redução de até 75% na carga desses tributos, dependendo do faturamento."},
    {q:"A tese está consolidada nos tribunais?",a:"Há jurisprudência favorável no STJ e em Tribunais Regionais Federais, mas o assunto ainda tem controvérsias. A solidez do caso depende da correta documentação da estrutura da clínica e da fundamentação técnica."},
    {q:"E se minha clínica não tiver estrutura de internação?",a:"A internação é um dos critérios discutidos, mas não é o único. Estabelecimentos com procedimentos invasivos, UTI, centro cirúrgico ou estrutura multiprofissional completa também têm sido reconhecidos. A análise define."},
    {q:"Quanto tempo demora para ver resultado?",a:"O pedido administrativo (DCOMP) pode ser homologado em meses. Ações judiciais levam entre 1 a 3 anos dependendo do tribunal. A adequação prospectiva tem efeito imediato após a orientação."},
  ].map(item=><FaqItem key={item.q} q={item.q} a={item.a}/>)}</div>
</div></section>

<section id="formulario" className="py-20 text-white" style={{background:`linear-gradient(150deg,#07182e,${NAVY})`}}><div className="container"><div className="grid lg:grid-cols-2 gap-12 items-start">
  <div><span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{color:GOLD}}>Análise de Viabilidade</span>
    <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">Sua clínica pode estar pagando <span style={{color:GOLD}}>mais tributos do que precisa.</span></h2>
    <p className="text-white/75 text-base leading-relaxed mb-8">Nossa equipe analisa o enquadramento da sua clínica e apresenta um diagnóstico técnico sobre a viabilidade e o potencial da tese.</p>
    <div className="space-y-3 mb-8">{["Análise de elegibilidade da clínica","Revisão das declarações dos últimos 5 anos","Cálculo do potencial de recuperação","Elaboração da fundamentação jurídica","Condução do pedido administrativo ou judicial"].map(item=>(<div key={item} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 shrink-0" style={{color:GOLD}}/><span className="text-white/80 text-sm">{item}</span></div>))}</div>
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all" style={{background:"#25D366",color:"#fff"}}><MessageCircle className="w-4 h-4"/>Falar pelo WhatsApp</a>
      <a href="tel:+5586994820054" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{borderColor:`${GOLD}50`,color:GOLD}}><Phone className="w-4 h-4"/>(86) 99482-0054</a>
    </div>
  </div>
  <div className="rounded-3xl p-8" style={{background:"rgba(255,255,255,0.05)",border:`1.5px solid ${GOLD}30`,backdropFilter:"blur(10px)"}}>
    <h3 className="font-serif text-xl font-bold text-white mb-2">Analise a viabilidade da tese para sua clínica.</h3>
    <p className="text-white/60 text-sm mb-6">Preencha os dados para uma análise personalizada do enquadramento tributário.</p>
    <Formulario/>
  </div>
</div></div></section>

<section className="py-8 border-t" style={{background:"#07182e",borderColor:`${GOLD}15`}}><div className="container text-center">
  <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">Esta página tem caráter exclusivamente informativo. Não constitui aconselhamento jurídico. A viabilidade da tese depende de análise individualizada do caso concreto. Sem garantia de resultado. Atuação em conformidade com o Código de Ética e Disciplina da OAB.</p>
  <p className="text-white/25 text-xs mt-3">© {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA</p>
</div></section>
</SiteLayout>);}
