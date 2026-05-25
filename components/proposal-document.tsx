import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

/* ── Typography ── */
Font.register({
  family: "Playfair",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDXbtXK-F2qC0usEw.woff",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDXbtXK-F2qC0usEw.woff",
      fontWeight: 500,
    },
  ],
});

Font.register({
  family: "Jakarta",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NSg.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NSg.woff2",
      fontWeight: 600,
    },
  ],
});

/* ── Paleta Mama Flora ── */
const C = {
  moss:     "#2d5a3d",
  moss2:    "#3d7a52",
  moss4:    "#8cc4a0",
  moss5:    "#c4e0d0",
  moss6:    "#e8f4ee",
  ink:      "#12150f",
  ink2:     "#2a2e24",
  ink3:     "#4a5040",
  ink4:     "#7a8470",
  ink5:     "#aab4a0",
  paper:    "#f7f5f0",
  paper2:   "#eeebe3",
  paper3:   "#e4e0d6",
  gold:     "#c8960c",
  goldLight:"#fdf3d8",
  white:    "#ffffff",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "Jakarta",
    backgroundColor: C.white,
    paddingBottom: 60,
  },

  /* ── HEADER ── */
  header: {
    backgroundColor: C.white,
    paddingHorizontal: 48,
    paddingTop: 32,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: C.paper3,
  },
  logo: {
    width: 160,
    height: 64,
    objectFit: "contain",
  },
  headerMeta: {
    alignItems: "flex-end",
  },
  headerTagline: {
    fontFamily: "Playfair",
    fontSize: 9,
    color: C.ink4,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  headerRef: {
    fontSize: 8,
    color: C.ink5,
    letterSpacing: 0.5,
  },

  /* ── COVER BAND ── */
  coverBand: {
    backgroundColor: C.moss,
    paddingHorizontal: 48,
    paddingVertical: 28,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  coverLeft: {
    flex: 1,
  },
  coverLabel: {
    fontSize: 8,
    color: "rgba(255,255,255,0.45)",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  coverTitle: {
    fontFamily: "Playfair",
    fontSize: 26,
    color: C.white,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  coverSub: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
  },
  coverPillsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  coverPill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: "flex-start",
  },
  coverPillLabel: {
    fontSize: 7,
    color: "rgba(255,255,255,0.42)",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  coverPillValue: {
    fontFamily: "Playfair",
    fontSize: 13,
    color: C.white,
  },

  /* ── ACENTO LATERAL ── */
  accentBar: {
    width: 4,
    backgroundColor: C.moss4,
    borderRadius: 2,
    marginRight: 12,
    flexShrink: 0,
  },

  /* ── BODY ── */
  body: {
    paddingHorizontal: 48,
    paddingTop: 32,
  },

  /* ── SECTION ── */
  section: {
    marginBottom: 28,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: C.paper2,
  },
  sectionLast: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontFamily: "Playfair",
    fontSize: 16,
    color: C.moss,
    marginBottom: 12,
    fontWeight: 500,
  },
  sectionBody: {
    fontSize: 10,
    color: C.ink2,
    lineHeight: 1.75,
  },

  /* ── DESTAQUE QUOTE ── */
  quoteBox: {
    backgroundColor: C.moss6,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: C.moss,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
  },
  quoteText: {
    fontFamily: "Playfair",
    fontSize: 11,
    color: C.moss2,
    lineHeight: 1.6,
    fontStyle: "italic",
  },

  /* ── TABELA DE ITENS ── */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: C.moss,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: C.paper2,
  },
  tableRowAlt: {
    backgroundColor: C.paper,
  },
  tableRowTotal: {
    flexDirection: "row",
    backgroundColor: C.moss6,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 2,
  },
  thText: {
    fontSize: 8,
    fontWeight: 600,
    color: C.white,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tdText: {
    fontSize: 10,
    color: C.ink2,
  },
  tdBold: {
    fontSize: 10,
    fontWeight: 600,
    color: C.ink,
  },
  tdTotal: {
    fontFamily: "Playfair",
    fontSize: 13,
    color: C.moss,
  },
  col1: { flex: 3 },
  col2: { flex: 2 },
  col3: { flex: 1, textAlign: "right" },
  col4: { flex: 1.5, textAlign: "right" },

  /* ── CONDIÇÕES COMERCIAIS ── */
  condGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  condCard: {
    width: "46%",
    backgroundColor: C.paper,
    borderRadius: 8,
    padding: 12,
  },
  condLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: C.ink4,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 4,
  },
  condValue: {
    fontSize: 11,
    fontWeight: 600,
    color: C.ink2,
  },

  /* ── CHIPS DE PRODUTO ── */
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: C.moss6,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  chipText: {
    fontSize: 9,
    color: C.moss,
    fontWeight: 600,
  },

  /* ── DIVISOR COM TEXTO ── */
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: C.paper3,
  },
  dividerText: {
    fontSize: 8,
    color: C.ink5,
    marginHorizontal: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  /* ── SELOS DE QUALIDADE ── */
  seloRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  selo: {
    flex: 1,
    backgroundColor: C.paper,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  seloIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  seloTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: C.ink2,
    marginBottom: 2,
    textAlign: "center",
  },
  seloText: {
    fontSize: 8,
    color: C.ink4,
    textAlign: "center",
    lineHeight: 1.4,
  },

  /* ── LINHA ACCENT ── */
  accentLine: {
    height: 2,
    backgroundColor: C.moss4,
    borderRadius: 1,
    marginBottom: 28,
  },

  /* ── FOOTER ── */
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.moss,
    paddingHorizontal: 48,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerTagline: {
    fontFamily: "Playfair",
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    fontStyle: "italic",
  },
  footerContact: {
    fontSize: 8,
    color: "rgba(255,255,255,0.5)",
    letterSpacing: 0.4,
  },
  footerPage: {
    fontSize: 8,
    color: "rgba(255,255,255,0.4)",
  },
});

/* ── Tipos ── */
export interface ProposalData {
  id: string;
  name: string;
  client: string;
  value: number;
  margin: number;
  products: string[];
  date: string;
  stage: string;
  type: string;
  presentationText?: string;
}

/* ── Helpers ── */
const brl = (v: number) => `R$ ${v.toLocaleString("pt-BR")}`;
const today = new Date().toLocaleDateString("pt-BR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20de%20mai.%20de%202026%2C%2011_17_57-R7VnR8n2LLi9wOnEimQUecxyr4kNVm.png";

/* ── Componente Principal ── */
export function ProposalDocument({ data }: { data: ProposalData }) {
  const itemValue = Math.round(data.value / data.products.length / 100) * 100;

  return (
    <Document
      title={`Proposta ${data.name} — Mama Flora`}
      author="Mama Flora Paisagismo"
      subject="Proposta Comercial"
      creator="Mama Flora Commercial OS"
    >
      {/* ══ PÁGINA 1 — CAPA + APRESENTAÇÃO + ITENS ══ */}
      <Page size="A4" style={s.page}>
        {/* Header com logo */}
        <View style={s.header}>
          <Image src={LOGO_URL} style={s.logo} />
          <View style={s.headerMeta}>
            <Text style={s.headerTagline}>Proposta Comercial</Text>
            <Text style={s.headerRef}>
              {data.id} · {today}
            </Text>
          </View>
        </View>

        {/* Faixa cover verde */}
        <View style={s.coverBand}>
          <View style={s.coverLeft}>
            <Text style={s.coverLabel}>
              Mama Flora · Paisagismo Premium · Proposta Exclusiva
            </Text>
            <Text style={s.coverTitle}>{data.name}</Text>
            <Text style={s.coverSub}>{data.client}</Text>
            <View style={s.coverPillsRow}>
              {[
                ["Investimento", brl(data.value)],
                ["Prazo", "30–45 dias úteis"],
                ["Validade", "30 dias"],
                ["Margem", `${data.margin}%`],
              ].map(([label, value]) => (
                <View key={label} style={s.coverPill}>
                  <Text style={s.coverPillLabel}>{label}</Text>
                  <Text style={s.coverPillValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Accent line */}
          <View style={{ height: 3, backgroundColor: C.moss4, borderRadius: 2, marginBottom: 28 }} />

          {/* Seção Apresentação */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Apresentação</Text>
            {data.presentationText ? (
              <View style={s.quoteBox}>
                <Text style={s.quoteText}>{data.presentationText}</Text>
              </View>
            ) : (
              <Text style={s.sectionBody}>
                A Mama Flora tem o prazer de apresentar esta proposta desenvolvida
                com dedicação exclusiva para {data.client}. Com mais de uma
                década de excelência em paisagismo premium, nossa equipe
                selecionou cada elemento para criar uma experiência botânica
                singular que transforma espaços comuns em ambientes vivos,
                sofisticados e duradouros.
              </Text>
            )}
            <Text style={[s.sectionBody, { marginTop: 10 }]}>
              O projeto <Text style={{ fontWeight: 600, color: C.moss }}>{data.name}</Text>{" "}
              representa um investimento de{" "}
              <Text style={{ fontWeight: 600 }}>{brl(data.value)}</Text> na
              transformação do espaço de {data.client}. Estamos prontos para
              iniciar assim que esta proposta for aprovada.
            </Text>
          </View>

          {/* Seção Soluções */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Soluções Propostas</Text>
            <View style={s.chipRow}>
              {data.products.map((p) => (
                <View key={p} style={s.chip}>
                  <Text style={s.chipText}>{p}</Text>
                </View>
              ))}
            </View>

            {/* Tabela de itens */}
            <View style={s.tableHeader}>
              <Text style={[s.thText, s.col1]}>Item / Serviço</Text>
              <Text style={[s.thText, s.col2]}>Especificação</Text>
              <Text style={[s.thText, s.col3]}>Qtd</Text>
              <Text style={[s.thText, s.col4]}>Valor</Text>
            </View>
            {data.products.map((p, i) => (
              <View
                key={p}
                style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
              >
                <Text style={[s.tdBold, s.col1]}>{p}</Text>
                <Text style={[s.tdText, s.col2]}>Conforme briefing</Text>
                <Text style={[s.tdText, s.col3]}>1</Text>
                <Text style={[s.tdBold, s.col4]}>{brl(itemValue)}</Text>
              </View>
            ))}
            <View style={s.tableRowTotal}>
              <Text style={[s.tdBold, s.col1, { color: C.moss }]}>
                Total do Investimento
              </Text>
              <Text style={[s.tdText, s.col2]} />
              <Text style={[s.tdText, s.col3]} />
              <Text style={[s.tdTotal, s.col4]}>{brl(data.value)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerTagline}>
            Mama Flora · Paisagismo que Transforma
          </Text>
          <Text style={s.footerContact}>
            contato@mamaflora.com.br · (11) 4040-1234
          </Text>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>

      {/* ══ PÁGINA 2 — CONDIÇÕES COMERCIAIS + DIFERENCIAIS ══ */}
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Image src={LOGO_URL} style={s.logo} />
          <View style={s.headerMeta}>
            <Text style={s.headerTagline}>Condições Comerciais</Text>
            <Text style={s.headerRef}>{data.id}</Text>
          </View>
        </View>

        <View style={s.body}>
          <View style={{ height: 3, backgroundColor: C.moss4, borderRadius: 2, marginBottom: 28 }} />

          {/* Condições */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Condições Comerciais</Text>
            <View style={s.condGrid}>
              {[
                ["Validade da Proposta", "30 dias corridos"],
                ["Forma de Pagamento", "50% entrada + 50% na entrega"],
                ["Prazo de Execução", "30 a 45 dias úteis"],
                ["Garantia", "12 meses nos serviços"],
                ["Visita Técnica", "Inclusa no projeto"],
                ["Manutenção Inicial", "2 visitas inclusas"],
              ].map(([label, value]) => (
                <View key={label} style={s.condCard}>
                  <Text style={s.condLabel}>{label}</Text>
                  <Text style={s.condValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Diferenciais */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Por que Mama Flora?</Text>
            <Text style={[s.sectionBody, { marginBottom: 16 }]}>
              Somos especialistas em criar ambientes biofílicos que unem estética,
              função e sustentabilidade. Cada projeto é pensado do zero para o
              cliente, com espécies selecionadas para o clima e o contexto local.
            </Text>
            <View style={s.seloRow}>
              {[
                ["Mais de 10 anos", "de experiência em paisagismo premium"],
                ["+ 500 projetos", "entregues com excelência em SP"],
                ["Equipe certificada", "em biofilia e design sustentável"],
                ["Suporte completo", "do briefing à manutenção"],
              ].map(([title, desc]) => (
                <View key={title} style={s.selo}>
                  <Text style={s.seloTitle}>{title}</Text>
                  <Text style={s.seloText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Próximos passos */}
          <View style={[s.section, s.sectionLast]}>
            <Text style={s.sectionTitle}>Próximos Passos</Text>
            {[
              ["01", "Aprovação desta proposta pelo cliente"],
              ["02", "Assinatura do contrato e pagamento da entrada"],
              ["03", "Visita técnica para levantamento final"],
              ["04", "Início da execução do projeto"],
              ["05", "Entrega e treinamento de manutenção"],
            ].map(([num, text]) => (
              <View
                key={num}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: C.moss,
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Text
                    style={{ fontSize: 9, color: C.white, fontWeight: 600 }}
                  >
                    {num}
                  </Text>
                </View>
                <Text style={[s.sectionBody, { flex: 1 }]}>{text}</Text>
              </View>
            ))}
          </View>

          {/* Assinatura */}
          <View
            style={{
              marginTop: 32,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: C.paper3,
                  width: "100%",
                  marginBottom: 6,
                }}
              />
              <Text style={{ fontSize: 9, color: C.ink4 }}>
                Mama Flora · Responsável Comercial
              </Text>
            </View>
            <View style={{ width: 40 }} />
            <View style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: C.paper3,
                  width: "100%",
                  marginBottom: 6,
                }}
              />
              <Text style={{ fontSize: 9, color: C.ink4 }}>
                {data.client} · Aprovação
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerTagline}>
            Mama Flora · Paisagismo que Transforma
          </Text>
          <Text style={s.footerContact}>
            contato@mamaflora.com.br · (11) 4040-1234
          </Text>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
