import { Container, Modal, Button, Group, TextInput, Box , Burger, Drawer,Progress, PasswordInput, Text, Center } from '@mantine/core';
import { useDisclosure  } from '@mantine/hooks';
import  useStyles  from '../style/container.style'
import { HeadGroup } from '../inputs/HeaderGroup';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useForm, hasLength, matchesField  } from '@mantine/form';
import { ethers } from "ethers";
import { GsButton, GsLogoutButton } from '../buttons/GSButton';
import { useAuth, usePolybase, useIsAuthenticated } from "@polybase/react";
import { secp256k1, aescbc, decodeFromString, encodeToString, EncryptedDataAesCbc256 } from '@polybase/util'
import { useBoundStore3} from '../../stores/datastate'
//import { ethPersonalSign } from '@polybase/eth'
//import { Polybase } from "@polybase/client"
import { useEffect } from 'react';

interface FormValues {
  name: string;
  password: string;
  confirmPassword: string;
}
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}
export function HeaderContainer ({ searchbar }:{searchbar?: React.ReactElement;}) {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
      password:(value) => getStrength(value) !== 100 ? 'Passwords did not meet requirements' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });
  
  const { classes } = useStyles();
  const { auth, state } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedburger, { toggle }] = useDisclosure(false);
  const { inUser, pRecord, updateinUser, pKey, updatepRecord, updatepKey, pvKey, updatepvKey } = useBoundStore3();
  const [isLoggedIn] = useIsAuthenticated();
  const content = Array(12)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);
  const polybase = usePolybase();
  
  const signInUser =  async() => {
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
    // const res = await auth.signIn();
    // let publicKeys: any  = res!.publicKey;
    // const userData = await polybase.collection('Key').record(publicKeys).get();
    // const exists = userData.exists();
    open();
    /*if(exists == false){
      open();
    }else{
      const decryptedValue = decodeFromString(userData.data.pvkeyst,  'hex');
      const str = encodeToString(decryptedValue, 'utf8');
      const decryptedData = JSON.parse(str);
      const keys = decodeFromString(publicKeys, 'hex');
      const key =  keys.subarray(first,last);
      var nonce = decryptedData.nonce;
      var resultnonce = [];
      var resultciphertext = [];
      var ciphertext = decryptedData.ciphertext;
      for(var i in nonce){
        resultnonce.push(nonce[i]);
      }
      for(var i in ciphertext){
        resultciphertext.push(ciphertext[i]);
      }
      const decryptedDataJson = {version: decryptedData.version, nonce: new Uint8Array(resultnonce), ciphertext: new Uint8Array(resultciphertext), };
      const strData = await aescbc.symmetricDecrypt(key, decryptedDataJson);
      const publicKey = await secp256k1.getPublicKey(strData);
      const precordalpha = encodeToString(publicKey, 'hex');
      const recordkey = '0x' + precordalpha.slice(4);
      updatepRecord(recordkey);
      updatepvKey(strData);
      updatepKey(publicKey);
     }*/
  };
  const signoutUser =  async() => {
    await auth.signOut();
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
  }
  const handleSubmit = async(values: FormValues) => {
    console.log(values);
    form.reset();
    console.log(values);
    const privateKey = await secp256k1.generatePrivateKey();
    var walled1 = await new ethers.Wallet(privateKey);
    var dud = await secp256k1.getPublicKey(privateKey);
    var dud2 = encodeToString(dud,'hex')
    console.log('walled1publickey dud2',dud2);
    console.log('privateKey dud2',privateKey);
    console.log('walled1publickey',walled1.publicKey);
    /*const keys = decodeFromString(publicKeys, 'hex');
    const key =  keys.subarray(0,16);
    const encryptedData = await aescbc.symmetricEncrypt(key, privateKey);
    const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
    const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
    const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
    const str = encodeToString(strDataAsUint8Array, 'hex');
    const str2 = str.toString();
    const db = await new Polybase({defaultNamespace: "pk/0x89de820323237a0e6cab8c5f29dfbf2f026f8c1da20c01f5b06b31877252a9d0f493bf95b625b667b1bdb3fb1593553bda1f056220cb2aa0e680316dba8b9a2c/hack",
});
  db.signer(async (data) => {
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign( privateKey, data)
      }
      });*/
    close();
    const userData2 = await polybase.collection('User').get();
    const ddde = await polybase.collection("User").record(userData2.data[0].data.id).get();
    console.log(userData2.data[0]);
    console.log(ddde);
    if(userData2.data.length < 1){
      const upload = await polybase.collection('User').create([values.name]);
    }/*else{
      updatepvKey(privateKey);
      await db.collection('User').create([Date.now().toString()]);
      //collection('Key').create([db.collection("User").record(userData2.data[0].data.id), str2]);
    }*/
    const publicKey = await secp256k1.getPublicKey(privateKey);
    const precordalpha = encodeToString(publicKey, 'hex');
    const recordkey = '0x' + precordalpha.slice(4);
    updatepRecord(recordkey);
    updatepKey(publicKey);
  }
  const valued = form.values.password;
  const strength = getStrength(valued);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(valued)} />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '200ms' } }}
        value={
          valued.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));
  useEffect(() => {
    auth!.onAuthUpdate((authState) => {
      if (authState!) {
        updateinUser(authState.publicKey!.toString());
        console.log(authState,'hhlp');
      }
    })
  },[auth,updateinUser])
  return (
  <Container className={classes.inner} fluid>
    <HeadGroup/>
    { searchbar }
    {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton className={classes.mobile} onClick={signInUser} />) : (<GsButton onClick={signInUser} className={classes.mobile} />)}
    <Burger opened={openedburger} onClick={toggle} className={classes.nonMobile} />
    <Modal opened={opened} onClose={close} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" maw="60lvh" miw={300} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
      <PasswordInput
        placeholder="Your password"
        label="Password"
        required {...form.getInputProps('password')} />
        <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      <PasswordRequirement label="Has at least 6 characters" meets={valued.length > 5} />
      {checks}
      <PasswordInput
        placeholder="Confirm Password"
        label="Confirm Password"
        required{...form.getInputProps('confirmPassword')} />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
    </Modal>
    <Drawer opened={openedburger} onClose={toggle} classNames={{root: classes.nonMobile, content: classes.controldd,}} position="bottom" size='60dvh' title="  " withCloseButton={false}>
      {content}
      {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton onClick={signInUser} className={classes.nonMobile} />) : (<GsButton onClick={signInUser} className={classes.nonMobile} />)}
    </Drawer>
  </Container>
  );
}; 
