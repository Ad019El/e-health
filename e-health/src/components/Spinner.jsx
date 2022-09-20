export default function Spinner(props) {
  return (
    props.calendar == "calendar" ?
    (<div class="w-full h-96 m-5 z-0 border-2 rounded-md mx-auto">
      <div class="flex animate-pulse flex-col items-center h-full space-x-5">
        <div class="w-full mb-6 bg-gray-300 h-full "></div>
      </div>
    </div>)
    :
    (<div class="w-64 h-52 border-2 rounded-md mx-auto">
      <div class="flex animate-pulse flex-col items-center h-full justify-center space-x-5">
        <div class="w-12 mb-6 bg-gray-300 h-12 rounded-full "></div>
        <div class="flex flex-col space-y-3">
          <div class="w-36 bg-gray-300 h-6 rounded-md "></div>
          <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </div>
    </div>)
  );
}
