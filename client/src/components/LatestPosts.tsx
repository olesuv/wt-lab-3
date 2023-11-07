// import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export default function LatestPosts() {
  axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

  function getAllPosts() {
    try {
      const response = axios.get("/posts");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getAllPosts();

  return (
    <big>No shit right now</big>
    // <InfiniteScroll
    //   dataLength={items.length} //This is important field to render the next data
    //   next={fetchData}
    //   hasMore={true}
    //   loader={<h4>Loading...</h4>}
    //   endMessage={
    //     <p style={{ textAlign: "center" }}>
    //       <b>Yay! You have seen it all</b>
    //     </p>
    //   }
    //   // below props only if you need pull down functionality
    //   //   refreshFunction={this.refresh}
    //   pullDownToRefresh
    //   pullDownToRefreshThreshold={50}
    //   pullDownToRefreshContent={
    //     <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
    //   }
    //   releaseToRefreshContent={
    //     <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
    //   }
    // >
    //   {items}
    // </InfiniteScroll>
  );
}
