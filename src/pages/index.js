import Form from '../components/template/form/index';
import Layout from '../layout';
import TableComp from '../components/template/table/TableComp';
import useLoadUser from '@/src/hooks/useLoadUser';

const Home = () => {

  const { data } = useLoadUser();


  return (
    <Layout>
      <Form/>
      <TableComp data={data || []}/>
    </Layout>
  );
};

export default Home;