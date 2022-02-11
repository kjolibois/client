import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Paper } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
//import { useAppDispatch } from '../../store/configureStore';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';





export default function Register() {
  const history = useHistory();
 // const dispatch = useAppDispatch();
  const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}} = useForm ({
    mode:'all'
  })
  function handleApiErrors(errors:any){
    if(errors){
      errors.forEach((error:string) => {
        if (error.includes('Password')){
            setError('password',{message : error})
        } else if (error.includes('Email')){
          setError('email',{message : error})
        } else if (error.includes('Username')){
          setError('username',{message : error})
        }
      })
    }
  }
  /*
    async function submitForm(data: FieldValues)
    {
        await dispatch(signInUser(data))
        history.push('/catalog');
    }*/
  return (

      <Container component={Paper} maxWidth="sm" sx={{display:'flex', flexDirection:'column', alignItems:'center',p:4}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" 
              onSubmit={handleSubmit((data) => 
                agent.Account.register(data)
                .then(() => {
                  toast.success('registration successful you can login')
                  history.push('/login')
                })
                .catch(error => handleApiErrors(error)))
            } 
            noValidate sx={{ mt: 1 }}
          
          >
            <TextField
              margin="normal"

              fullWidth
              label="Username"
              autoFocus
              {...register('username',

              {required:"Username is required"})
            
              }
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"

              fullWidth
              label="Email"
              {...register('email',{
                required:"Email is required",
                pattern :{
                  value:/^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
                  message: 'Not a valid email address'
                }
              
              })}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password',{
                  required:"Password is required",
                  pattern :{
                    value:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'Not a valid password'
                  }
                }
              )}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              disabled={!isValid}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item xs>

              </Grid>
              <Grid item>
                <Link to="/login" >
                  {"already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

