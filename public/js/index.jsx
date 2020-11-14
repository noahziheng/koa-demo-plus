const requestApi = (url, queryParams, data, method = 'GET') => {
  let reqUrl = url;
  const reqOptions = {
    method
  };
  if (queryParams) {
    const queryStr = Object.keys(queryParams).map((key) => `${key}=${queryParams[key]}`).join('&');
    if (queryStr) {
      reqUrl += `?${queryStr}`;
    }
  }
  if (data) {
    reqOptions.headers = {
      'Content-Type': 'application/json'
    };
    reqOptions.body = JSON.stringify(data);
  }
  return fetch(reqUrl, reqOptions)
    .then((res) => res.json())
    .then((result) => {
      if (!result || !result.success) {
        throw new Error(result && result.errMsg);
      }
      return result.data;
    })
    .catch((err) => {
      window.alert(err.message);
    });
};

const Icon = ({
  type,
  onClick
}) => {
  if (type === 'todo') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1DFaGlNvbeK8jSZPfXXariXXa-200-200.png" onClick={onClick} />;
  } else if (type === 'done') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1yWk11.Y1gK0jSZFCXXcwqXXa-200-200.png" onClick={onClick} />;
  } else if (type === 'delete') {
    return <img className="icon" src="https://gw.alicdn.com/tfs/TB1UEaio3gP7K4jSZFqXXamhVXa-200-200.png" onClick={onClick} />;
  }
  return null;
};

const App = () => {
  const [inputVal, setInputVal] = React.useState('');
  const [itemList, setItemList] = React.useState([]);

  const fetchData = () => {
    return (() => {
      if (window.preloadData && window.preloadData.todoList) {
        // 预加载数据处理
        return Promise.resolve(window.preloadData.todoList)
          .then(res => {
            window.preloadData.todoList = null; // 预加载数据只使用一次
            return res;
          });
      }
      return requestApi('/api/todos');
    })().then((result) => {
      setItemList(Array.isArray(result) ? result : []);
    });
  };

  const handleAdd = () => {
    if (!inputVal) {
      alert('Empty input!');
    }
    const newItem = {
      text: inputVal,
      completed: false
    };
    return requestApi('/api/todo', null, newItem, 'POST')
      .then(() => {
        fetchData()
      })
      .then((res) => {
        console.log(res);
        setInputVal('');
      });
  };

  const handleDelete = (i) => {
    return requestApi('/api/todo', { i }, null, 'DELETE')
      .then(() => fetchData());
  };

  const handleSwitchCompleted = (i) => {
    const item = itemList[i];
    const newItem = {
      ...item,
      completed: !item.completed
    };
    return requestApi('/api/todo', { i }, newItem, 'PATCH')
      .then(() => fetchData());
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return <div className="todoContainer">
    <span className="title">Simple Todo</span>
    <div className="inputView">
      <input type="text" value={inputVal} onChange={(e) => setInputVal(event.target.value)} />
      <button onClick={() => handleAdd()}>Add</button>
    </div>
    <div className="listView">
      {itemList.length ? itemList.map((listItem, i) => {
        return <div className="listItem" key={`listItem${i}`}>
          {listItem.completed ?
            <Icon type="done" onClick={() => handleSwitchCompleted(i)} /> : 
            <Icon type="todo" onClick={() => handleSwitchCompleted(i)} />
          }
          {listItem.completed ? 
            <span className="text-done">{listItem.text}</span> : 
            <span className="text">{listItem.text}</span>
          }
          <Icon type="delete" onClick={() => handleDelete(i)} />
        </div>;
      }) : <span>No Item Data</span>}
    </div>
  </div>;
};

const domContainer = document.querySelector('#app');
console.log('HelloWorld')
ReactDOM.render(<App />, domContainer);