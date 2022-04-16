import React, { useState} from 'react';
import axios from 'axios';
import './App.css';
import debounce from 'lodash.debounce';

const baseURL= '//githubusersearch-env.eba-rtqyhpjt.us-west-1.elasticbeanstalk.com'
const API = axios.create({baseURL: baseURL})
interface User{
  name: string,
  url: string,
  avatar: string,
}

const App: React.FC = ()=> {
  const [users,setUsers] = useState<User []>([]);
  const onChangeHandler = async (e:any)=>{    
     debounceCalls(e);   
  }
  const debounceCalls = debounce(async (e)=>{
    if(e.target.value.length<3){
      setUsers([])
    }
    else{
      console.log(e.target.value);
      const result = await API.post('/api/search',{text: e.target.value, type: "users"})
      const newUSers: User[] = result.data
      setUsers(newUSers);
      console.log(result);
    }
    
  },300);


  return (
    <div className='app'>      
      <div className='navbar'>
      <input placeholder='Search' onChange={onChangeHandler} className="button" /> 
      </div>
      <div className='cardContainer'>{users.length>0?users.map((item)=>(
        <div key={item.url} className="card">
          <a href={`https://github.com/${item.name}`} className="link"><img alt='avatar' className='userAvatar' src={item.avatar}/></a>
          <a href={`https://github.com/${item.name}`} className="link"><div className='userName'>{item.name}</div></a>
          </div>
      )):null}</div>
    </div>
  );
}

export default App;
