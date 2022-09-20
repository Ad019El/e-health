function TableItem(props) {
  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {props.fullname}
      </th>
      <td className="px-6 py-4">{props.date}</td>
      <td className="px-6 py-4">{props.duree}</td>
    </>
  );
}

export default TableItem;
