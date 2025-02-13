import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Property } from '../utils/parseProperties';

// Define styles
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  text: { marginBottom: 5 },
});

// Property PDF Component
const PropertyPDF: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.text}>📍 {property.provincia}</Text>
          <Text style={styles.text}>📏 {property.m_cons} m²</Text>
          <Text style={styles.text}>💰 {property.price} €</Text>
          <Text style={styles.text}>🛏️ {property.habdobles} Habitaciones</Text>
          <Text style={styles.text}>🚿 {property.banyos} Baños</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PropertyPDF;
