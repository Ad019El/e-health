function InfoCard(props){
return(
    <>
    <div class="shadow-md rounded-2xl w-64 p-4 py-6 bg-white">
    <div class="flex flex-col items-center justify-center">
        <div class="w-24 h-24 bg-green-200 rounded-full relative">
         <img src={props.image} alt="img"/>
        </div>
        <p class="text-gray-800 text-xl text-center font-medium mb-4 mt-4">
            {props.title}
        </p>
        <p class="text-gray-400 text-center text-xs px-2">
            {props.content}
        </p>
    </div>
</div>

    </>
);
}
export default InfoCard;