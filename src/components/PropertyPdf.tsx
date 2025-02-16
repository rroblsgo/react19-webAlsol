import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { Property } from '../utils/parseProperties';
import { priceFormat } from '../utils/priceFormat';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: '30px 50px',
    fontSize: 12,
    color: '#262626',
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  price: {
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    color: 'red',
    fontSize: 14,
    marginBottom: 4,
  },
  ref: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  // logo: { fontSize: '24px' },
  logo: { width: 137, height: 82 },
  textBold: { fontFamily: 'Helvetica-Bold' },
  spaceY: { display: 'flex', flexDirection: 'column', gap: '5px' },
  section: { marginBottom: 10 },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    padding: '5px',
    backgroundColor: '#DBD7D2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: { marginBottom: 5 },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
    fontFamily: 'Helvetica',
  },
});

// Property PDF Component
const PropertyPDF: React.FC<{
  property: Property;
  imageData: string | null;
  imageData2: string | null;
}> = ({ property, imageData, imageData2 }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image src="/cropped-Logotipo-RE-Claim.png" style={styles.logo} />
            {/* <Text style={[styles.logo, styles.textBold]}>Logo</Text> */}
          </View>
          <View style={styles.spaceY}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <Image
                src="/phone-call.png" // Store the image locally or use an URL
                style={{ width: 14, height: 14 }}
              />
              <Text style={styles.text}>123 34 56 78</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <Image
                src="/email.png" // Store the image locally or use an URL
                style={{ width: 14, height: 14 }}
              />
              <Text style={styles.textBold}>infoweb@inmoalsol.com</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.ref}>Referencia: {property.ref}</Text>
          <Text style={styles.price}>
            {priceFormat(Number(property.price))}
          </Text>
        </View>

        <View style={styles.title}>
          <Text>{property.title}</Text>
        </View>

        <View>
          <Image
            src={`/proxy${property.image}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <Image
            src={`/proxy${property.images[1].url}`}
            style={{ width: '33%', height: 'auto' }}
          />
          <Image
            src={`/proxy${property.images[2].url}`}
            style={{ width: '33%', height: 'auto' }}
          />
          <Image
            src={`/proxy${property.images[3].url}`}
            style={{ width: '33%', height: 'auto' }}
          />
        </View>

        <View
          style={{ marginTop: '10px', padding: '10px', lineHeight: '1rem' }}
        >
          <Text>{property.description.slice(0, 400) + '[...]'}</Text>
        </View>

        {imageData && (
          <Image src={imageData} style={{ width: '100%', height: 'auto' }} />
        )}
        {imageData2 && (
          <Image src={imageData2} style={{ width: '100%', height: 'auto' }} />
        )}

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PropertyPDF;
