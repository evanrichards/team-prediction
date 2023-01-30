import Layout from 'src/components/layout';

export default function IndexPage() {
  return (
    <Layout pageTitle={''}>
      {
        <article className="prose prose-invert">
          <h1>Welcome to Team Prediction</h1>
          <p>
            An internal prediction market platform designed specifically for
            companies.
          </p>
          <h2>
            Make informed decisions, understand sentiment, and surface risk
          </h2>
          <p>
            Our platform leverages the power of collective intelligence to
            generate accurate predictions and provide valuable insights into the
            {"expectations and beliefs of your company's workforce."}
          </p>
          <h2>Optional anonymous participation</h2>
          <p>
            We understand the importance of privacy in fostering a culture of
            {"open and honest participation. That's why we've made optional"}
            anonymous market creation and participation a key feature of our
            platform.
          </p>
          <h2>Get started today</h2>
          <p>
            Sign up for Team Prediction and start making better, more informed
            decisions. Our platform is easy to use and provides a fun and
            engaging way for employees to participate in the decision-making
            process.
          </p>
        </article>
      }
    </Layout>
  );
}
