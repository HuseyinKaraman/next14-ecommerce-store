import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";

export const revalidate = 0; 

const HomePage = async () => {

  const billboard = await getBillboard("1eaca54b-608d-44ad-a012-23d607f28a74");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard}/>
      </div>
    </Container>
  )
};

export default HomePage;
