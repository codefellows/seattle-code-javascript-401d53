'use strict';

const LinkedList = require('./index');

describe('Linked List', () => {

  test('Can successfully instantiate an empty linked list', () => {
    const list = new LinkedList();

    expect(list.head).toBeNull();
  });
  test('Can properly insert into the linked list', () => {
    const list = new LinkedList();
    list.insert(1);

    expect(list.head.value).toEqual(1);
    expect(list.head.next).toBeNull();
  });
  test('The head property will properly point to the first node in the linked list', () => {
    const list = new LinkedList();
    list.insert(2);

    expect(list.head.value).toEqual(2);
    expect(list.head.next).toBeNull();

    // Can properly insert multiple nodes into the linked list
    list.insert(1);
    expect(list.head.value).toEqual(1);
    expect(list.head.next.value).toEqual(2);
    expect(list.head.next.next).toBeNull();
    list.append('a');
    expect(list.head.next.next.value).toEqual('a');

  });

  test('returns true if value included, false if not', () => {
    const list = new LinkedList();
    list.insert(2);
    list.insert(1);

    expect(list.includes(1)).toBeTruthy();
    expect(list.includes('banana')).toBeFalsy();

  });

  test('can be rendered as an expected string', () => {
    const list = new LinkedList();
    list.insert('c');
    list.insert('b');
    list.insert('a');

    // goal: '{ a } -> { b } -> { c } -> NULL'
    expect(list.toString()).toEqual('{ a } -> { b } -> { c } -> NULL')
  });



});
