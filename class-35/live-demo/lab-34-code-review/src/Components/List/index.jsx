import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Badge, Card, CloseButton, Group, Pagination, Text } from '@mantine/core';
import Auth from '../Auth';
import { Else, If, Then } from 'react-if';
import { AuthContext } from '../../Context/Auth';

function List({ list, toggleComplete, deleteItem }) {
  const { isLoggedIn, can } = useContext(AuthContext);
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
        <Card mb="sm" shadow="md" withBorder key={item._id}>
          <Card.Section withBorder>
            <Group position="apart">
              <Group>
                <If condition={isLoggedIn && can('update')}>
                  <Then>
                    <Badge
                      onClick={() => toggleComplete(item)}
                      color={item.complete ? 'red' : 'green'}
                      variant="filled"
                      m="3px"
                    >
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Then>
                  <Else>
                  <Badge
                      color={item.complete ? 'red' : 'green'}
                      variant="filled"
                      m="3px"
                    >
                      {item.complete ? 'Complete' : 'Pending'}
                    </Badge>
                  </Else>
                </If>
                <Text>{item.assignee}</Text>
              </Group>
              <Auth capability="delete">
                <CloseButton
                  onClick={() => deleteItem(item._id)}
                  title="Close Todo Item"
                />
              </Auth>
            </Group>
          </Card.Section>
          <Text mt="sm" align="left">{item.text}</Text>
          <Text align="right"><small>Difficulty: {item.difficulty}</small></Text>
        </Card>

      ))}

      <Pagination value={activePage} onChange={setPage} total={pageCount} />

    </>
  )

}

export default List;
