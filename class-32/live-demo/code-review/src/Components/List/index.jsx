import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';

function List({ list, toggleComplete }) {
  const {
    displayCount,
    showComplete,
    sort
  } = useContext(SettingsContext);
  const [activePage, setPage] = useState(1);

  // proof of life, context is accessible
  // console.log(displayCount, showComplete, sort)

  // our renderable list will conditionally show or hide completed tasks
  const renderableList = showComplete ? list : list.filter(item => !item.complete);
  // console.log('our renderable list', renderableList)

  // determine how many pages will be in our pagination component
  const pageCount = Math.ceil(renderableList.length / displayCount);

  // where to start rendering display data
  const listStart = displayCount * (activePage - 1);
  // where to end (using slice)
  const listEnd = listStart + displayCount;

  // list that is displayed for each pagination page
  const displayList = renderableList.slice(listStart, listEnd);

  return (
    <>
      {displayList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
        
      ))}

      <Pagination value={activePage} onChange={setPage} total={pageCount} />

    </>
  )

}

export default List;
