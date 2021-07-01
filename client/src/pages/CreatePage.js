import React, {useEffect,  useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom'; 

export const CreatePage = () => {
  const history=useHistory();
  const auth=useContext(AuthContext);
  const {request} =useHttp();
  const [link, setLink] = useState('');
  useEffect(()=>{
    window.M.updateTextFields();
  }, []);
  const pressHandler = async e => {
    if (e.key === 'Enter') {
      try {
        console.log('auth.token= ', auth.token);
        const data=await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`} );
        console.log('data.loink._id: ', data.link._id);
        history.push(`/detail/${data.link._id}`);
      } catch (e) {
        //console.log(e);
        //throw e;
      }
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input placeholder="Вставьте ссылку" id="link" value={link} type="text" onChange={e => setLink(e.target.value)} onKeyPress={pressHandler} />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  )
}