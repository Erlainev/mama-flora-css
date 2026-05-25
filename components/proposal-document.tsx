'use client';

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

export interface ProposalData {
  id: string;
  name: string;
  client: string;
  value: number;
  margin: number;
  products?: string[];
  date?: string;
  stage?: string;
  type?: string;
  presentationText?: string;
}

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
    backgroundColor: C.white,
    paddingBottom: 60,
    fontFamily: "Helvetica",
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
  logoBox: {
    width: 180,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: C.moss,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: 7,
    color: C.ink4,
    letterSpacing: 1.2,
    marginTop: 4,
  },
  headerMeta: {
    alignItems: "flex-end",
  },
  headerDate: {
    fontSize: 9,
    color: C.ink4,
    marginBottom: 2,
  },
  headerRef: {
    fontSize: 8,
    color: C.ink5,
    letterSpacing: 0.5,
  },

  /* ── PROPOSAL SECTION ── */
  contentArea: {
    paddingHorizontal: 48,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: C.ink,
    marginBottom: 4,
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 11,
    color: C.ink3,
    marginBottom: 32,
    letterSpacing: 0.5,
  },

  /* ── CLIENT & PROJECT INFO ── */
  infoGrid: {
    flexDirection: "row",
    marginBottom: 40,
    gap: 24,
  },
  infoBox: {
    flex: 1,
    backgroundColor: C.moss6,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 4,
  },
  infoLabel: {
    fontSize: 7,
    color: C.moss,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 6,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: C.moss,
    marginBottom: 2,
  },
  infoSubtext: {
    fontSize: 9,
    color: C.ink4,
  },

  /* ── FINANCIAL SECTION ── */
  financialSection: {
    marginBottom: 40,
  },
  sectionLabel: {
    fontSize: 8,
    color: C.moss,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 12,
    fontWeight: "bold",
  },
  financialGrid: {
    flexDirection: "row",
    gap: 16,
  },
  financialCard: {
    flex: 1,
    borderLeftWidth: 4,
    borderLeftColor: C.moss,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  financialLabel: {
    fontSize: 8,
    color: C.ink4,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  financialValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: C.moss,
  },

  /* ── PRODUCTS ── */
  productsSection: {
    marginBottom: 40,
  },
  productRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.paper3,
    alignItems: "center",
  },
  productText: {
    fontSize: 9,
    color: C.ink2,
  },
  productBadge: {
    backgroundColor: C.moss6,
    color: C.moss,
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 7,
    borderRadius: 2,
    fontWeight: "bold",
  },

  /* ── PRESENTATION TEXT ── */
  presentationBox: {
    backgroundColor: C.goldLight,
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 4,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: C.gold,
  },
  presentationText: {
    fontSize: 10,
    color: C.ink,
    lineHeight: 1.6,
    fontWeight: "normal",
  },

  /* ── FOOTER ── */
  footer: {
    position: "absolute",
    bottom: 20,
    left: 48,
    right: 48,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.paper3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: C.ink4,
    letterSpacing: 0.5,
  },
  footerMoss: {
    fontSize: 9,
    fontWeight: "bold",
    color: C.moss,
  },
});

export function ProposalDocument({ data }: { data: ProposalData }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Document title={`Proposta - ${data.name}`}>
      <Page size="A4" style={s.page}>
        {/* HEADER */}
        <View style={s.header}>
          <View style={s.logoBox}>
            <Text style={s.logoText}>MAMA FLORA</Text>
            <Text style={s.logoSubtext}>PAISAGISMO PREMIUM</Text>
          </View>
          <View style={s.headerMeta}>
            <Text style={s.headerDate}>{dateStr}</Text>
            <Text style={s.headerRef}>Proposta #{data.id}</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={s.contentArea}>
          <Text style={s.title}>Proposta Comercial</Text>
          <Text style={s.subtitle}>Paisagismo | Projetos Executivos | Curadoria Botânica</Text>

          {/* CLIENT & PROJECT INFO */}
          <View style={s.infoGrid}>
            <View style={s.infoBox}>
              <Text style={s.infoLabel}>Cliente</Text>
              <Text style={s.infoValue}>{data.client}</Text>
            </View>
            <View style={s.infoBox}>
              <Text style={s.infoLabel}>Projeto</Text>
              <Text style={s.infoValue}>{data.name}</Text>
            </View>
            <View style={s.infoBox}>
              <Text style={s.infoLabel}>Tipo</Text>
              <Text style={s.infoValue}>{data.type || "Projeto"}</Text>
            </View>
          </View>

          {/* FINANCIAL SECTION */}
          <View style={s.financialSection}>
            <Text style={s.sectionLabel}>Investimento</Text>
            <View style={s.financialGrid}>
              <View style={s.financialCard}>
                <Text style={s.financialLabel}>VALOR TOTAL</Text>
                <Text style={s.financialValue}>R$ {(data.value / 1000).toFixed(0)}k</Text>
              </View>
              <View style={s.financialCard}>
                <Text style={s.financialLabel}>MARGEM</Text>
                <Text style={s.financialValue}>{data.margin}%</Text>
              </View>
              <View style={s.financialCard}>
                <Text style={s.financialLabel}>ESTÁGIO</Text>
                <Text style={s.financialValue} style={{ fontSize: 11 }}>
                  {data.stage || "Proposta"}
                </Text>
              </View>
            </View>
          </View>

          {/* PRODUCTS */}
          {data.products && data.products.length > 0 && (
            <View style={s.productsSection}>
              <Text style={s.sectionLabel}>Serviços Inclusos</Text>
              {data.products.map((product, idx) => (
                <View key={idx} style={s.productRow}>
                  <Text style={s.productText}>{product}</Text>
                </View>
              ))}
            </View>
          )}

          {/* PRESENTATION TEXT */}
          {data.presentationText && (
            <View style={s.presentationBox}>
              <Text style={s.presentationText}>{data.presentationText}</Text>
            </View>
          )}
        </View>

        {/* FOOTER */}
        <View style={s.footer}>
          <Text style={s.footerText}>© Mama Flora Paisagismo | Todos os direitos reservados</Text>
          <Text style={s.footerMoss}>mama flora</Text>
        </View>
      </Page>
    </Document>
  );
}
