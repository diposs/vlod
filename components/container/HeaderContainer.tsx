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
  password: string;
  confirmPassword: string;
}
interface FormValues2 {
  password: string;
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
      password: '',
      confirmPassword: '',
    },
    validate: {
      password:(value) => getStrength(value) !== 100 ? 'Passwords did not meet requirements' : null,
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });
  const form2 = useForm({
    initialValues: {
      password: '',
    },
  });
  
  const { classes } = useStyles();
  const { auth, state } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const [opened2, handlers] = useDisclosure(false);
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
    const res = await auth.signIn();
    console.log(res,'gg')
    let publicKeys: any  = res!.publicKey;
    const userData = await polybase.collection('User').record(publicKeys).get();
    const exists = userData.exists();
    if(exists == false){
      if(res!.type =='email'){
      open();
      } else{
        await polybase.collection('User').create([publicKeys]);
        var keys = decodeFromString(publicKeys, 'hex');
        updatepKey(keys);
        updateinUser(publicKeys);
      }
    }else{
      if(res!.type =='email'){
      /*const decryptedValue = decodeFromString(userData.data.pvkeyst,  'hex');
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
      updatepKey(publicKey);*/
      handlers.open();
     }
      updateinUser(publicKeys);
      var keys = decodeFromString(publicKeys, 'hex');
        updatepKey(keys);
    }
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
    let publicq: any = state!.publicKey || '';
    const privateKey = await secp256k1.generatePrivateKey();
    var walled1 = await new ethers.Wallet(privateKey);
    var dud = await secp256k1.getPublicKey(privateKey);
    var dud2 = encodeToString(dud,'hex')
    console.log('walled1publickey dud2',dud2);
    console.log('privateKey dud2',privateKey);
    console.log('walled1publickey',walled1.publicKey);
    const keys = decodeFromString(publicq, 'hex');
    const key =  keys.subarray(0,16);
    const passkey = decodeFromString(values.password, 'utf8');
    const passkeys = passkey.subarray(17,32);
    var mergedArray = new Uint8Array(key.length + passkeys.length);
    mergedArray.set(key);
    mergedArray.set(passkeys, key.length);
    const encryptedData = await aescbc.symmetricEncrypt(mergedArray, privateKey);
    console.log(encryptedData)
    const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
    const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
    const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
    const str = encodeToString(strDataAsUint8Array, 'hex');
    const str2 = str.toString();
    const decryptedValue = decodeFromString(str2,  'hex');
      const strdd = encodeToString(decryptedValue, 'utf8');
      const decryptedData = JSON.parse(strdd);
    const key1s = decodeFromString(publicq, 'hex');
    const key1 =  key1s.subarray(0,16);
    const passkey1 = decodeFromString(values.password, 'utf8');
    const passkeys1 = passkey1.subarray(17,32);
    var mergedArray1 = new Uint8Array(key1.length + passkeys1.length);
    mergedArray1.set(key1);
    mergedArray1.set(passkeys1, key1.length);
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
      const strData = await aescbc.symmetricDecrypt(mergedArray1, decryptedDataJson);
      const publicKey2 = await secp256k1.getPublicKey(strData);
      const precordalpha = encodeToString(publicKey2, 'hex');
    console.log(precordalpha, 'depcrtpublickey')
    console.log(strData, 'depcrtprivatekey')
      const recordkey = '0x' + precordalpha.slice(4);
    close();
  }
  const handleSubmit2 = async(values: FormValues2) => {
    console.log(values);
    form2.reset();
    console.log(values);
    let publicq: any = state!.publicKey || '';
    const privateKey = await secp256k1.generatePrivateKey();
    var walled1 = await new ethers.Wallet(privateKey);
    var dud = await secp256k1.getPublicKey(privateKey);
    var dud2 = encodeToString(dud,'hex')
    console.log('walled1publickey dud2',dud2);
    console.log('privateKey dud2',privateKey);
    console.log('walled1publickey',walled1.publicKey);
    const keys = decodeFromString(publicq, 'hex');
    const key =  keys.subarray(0,16);
    const passkey = decodeFromString(values.password, 'utf8');
    const passkeys = passkey.subarray(17,32);
    var mergedArray = new Uint8Array(key.length + passkeys.length);
    mergedArray.set(key);
    mergedArray.set(passkeys, key.length);
    const encryptedData = await aescbc.symmetricEncrypt(mergedArray, privateKey);
    const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
    const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
    const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
    const str = encodeToString(strDataAsUint8Array, 'hex');
    const str2 = str.toString();
    close();
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
    {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton className={classes.mobile} onClick={signoutUser} />) : (<GsButton onClick={signInUser} className={classes.mobile} />)}
    <Burger opened={openedburger} onClick={toggle} className={classes.nonMobile} />
    <Modal opened={opened} onClose={close} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" maw="60lvh" miw={300} mx="auto" onSubmit={form.onSubmit(handleSubmit)}>
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
    <Modal opened={opened2} onClose={() => handlers.close()} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Box component="form" maw="60lvh" miw={300} mx="auto" onSubmit={form2.onSubmit(handleSubmit2)}>
      <PasswordInput
        placeholder="Your password"
        label="Password"
        required {...form2.getInputProps('password')} />
        <Group spacing={5} grow mt="xs" mb="md">
        {bars}
      </Group>

      
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
