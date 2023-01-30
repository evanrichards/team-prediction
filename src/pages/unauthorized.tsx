import Layout from 'src/components/layout';

export default function Unauthorized() {
  return (
    <Layout pageTitle="Unauthorized">
      <h1>Unauthorized</h1>
      <p>You are not authorized to view this page.</p>
    </Layout>
  );
}
