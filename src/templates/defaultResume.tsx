import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslations } from 'next-intl';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
});

export const DefaultResume = () => {
  const t = useTranslations()

  return (<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>{t("welcome")}</Text>
        <Text>Kidiraliyuev Rustam</Text>
      </View>
      <View style={styles.section}>
        <Text>Experience:</Text>

      </View>
    </Page>
  </Document>
);}
