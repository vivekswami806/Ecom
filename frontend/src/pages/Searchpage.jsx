import { useNavigate } from "react-router-dom";
import useSearch from "../hook/useSearch";
import Layout from "../component/layout/Layout";
import MoreDeatils from "../component/form/MoreDetail";
import AddToCart from "../component/form/AddToCart";

function SearchPage() {
  let { search } = useSearch();
  let navigate = useNavigate();
  function singlPageHandler(id)
  {
      
       navigate(`/productdetailpage/${id}`)
  }
  return (
    <Layout title={"Search Result -ecom"}>
      <div className="container">
        <div className="row">
          <h1 className="text-center m-3">Search Result</h1>
          <p className="text-center">
            Found :<b>{search.result.length}</b>
          </p>
          {search.result.length == 0 && (
            <div >
              <h1>No Result</h1>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  GO BACK TO HOME
                </button>
              </div>
            </div>
          )}
              {search.result.length>0 && search.result.map((item)=>{
                    return <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <img src={item?.images[0]?.url} alt={item?.images[0]?.url} className='img-fluid'/>
                                </div>
                                <h6>{item?.name}</h6>
                                <p>{item?.description}</p>
                                <p>{item?.brand}</p>
                                <MoreDeatils p_id={item._id} singlPageHandler={singlPageHandler}  />
                              
                                <AddToCart/>
                            </div>
                        </div>
                    </div>
                })}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;