import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useState, forwardRef, useImperativeHandle } from 'react'

import icon_close_modal from '../assets/images/icon_close_modal.png'

import { getUUID } from '../utils/uuid'
import { storageLoad, storageSave } from '../utils/storage'


export default forwardRef(function AddAccount(props, ref) {

    const { onSave } = props;


    const [visible, setVisible] = useState(false)

    const [isModify, setIsModify] = useState(false)


    const [id, setId] = useState('')

    const [type, setType] = useState('游戏')

    const [name, setName] = useState('')

    const [account, setAccount] = useState('')

    const [password, setPassword] = useState('')





    useImperativeHandle(ref, () => {
        return {
            show: show,
            hide: hide
        }
    })


    const show = (currentAccount) => {
        setVisible(true)

        if (currentAccount) {
            setIsModify(true)

            setId(currentAccount.id);
            setType(currentAccount.type);
            setName(currentAccount.name);
            setAccount(currentAccount.account);
            setPassword(currentAccount.password)
        } else {

            setIsModify(false)


            setId(getUUID());
            setType('游戏');
            setName('');
            setAccount('');
            setPassword('');
        }

    }

    const hide = () => {
        setVisible(false)
    }


    const onSavePress = () => {
        const newAccount = {
            id: id,
            type: type,
            name: name,
            account: account,
            password: password
        }

        storageLoad('accountList').then((data) => {
            let accountList = data ? JSON.parse(data) : [];

            if (isModify) {
                accountList = accountList.filter(item => item.id !== id)

            }


            accountList.push(newAccount);
            storageSave('accountList', JSON.stringify(accountList)).then(() => {
                // storageLoad('accountList').then((newData) => {
                //     console.log(newData)
                // })

                onSave()

                hide()
            })
        })


    }


    const renderTitle = () => {
        const styles = StyleSheet.create({
            titleLayout: {
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
            },
            titleTxt: {
                fontSize: 16,
                color: '#333333',
                fontWeight: 'bold'
            },
            closeButton: {
                position: 'absolute',
                right: 6,
            },
            closeImg: {
                width: 28,
                height: 28,
                resizeMode: 'contain'
            }
        });


        return (
            <View style={styles.titleLayout}>
                <Text style={styles.titleTxt}>{isModify ? '修改账号' : '添加账号'}</Text>
                <TouchableOpacity style={styles.closeButton}
                    onPress={() => hide()}

                >
                    <Image style={styles.closeImg} source={icon_close_modal}></Image>
                </TouchableOpacity>
            </View>
        )


    }



    const renderType = () => {
        const typeArray = ['游戏', '平台', '银行卡', '其他']



        const styles = StyleSheet.create({
            typesLayout: {
                width: '100%',
                height: 32,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8
            },
            tab: {
                flex: 1,
                height: '100%',
                borderWidth: 1,
                borderColor: '#C0C0C0',
                justifyContent: 'center',
                alignItems: 'center'
            },
            leftTab: {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
            },
            rightTab: {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
            },
            moveLeft1Pix: {
                marginLeft: -1
            },
            tabTxt: {
                fontSize: 14
            }

        })





        return (
            <View style={styles.typesLayout}>
                {typeArray.map((item, index) => {
                    return (
                        <TouchableOpacity style={[
                            styles.tab, index === 0 ? styles.leftTab :
                                index === 3 ? styles.rightTab : {},
                            index > 0 && styles.moveLeft1Pix,
                            { backgroundColor: type === item ? '#3050ff' : 'transparent' }
                        ]} key={`${item}`}

                            onPress={() => {
                                setType(item)
                            }}>
                            <Text style={[styles.tabTxt, { color: type === item ? 'white' : '#666666' }]}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}

            </View>
        )
    }

    const renderName = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333'
            }
        })

        return (
            <TextInput style={styles.input} maxLength={20}
                value={name}
                onChangeText={(text) => {
                    setName(text || '')
                }}></TextInput>
        );
    }


    const renderAccount = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333'
            }
        })

        return (
            <TextInput style={styles.input} maxLength={20}
                value={account}
                onChangeText={(text) => {
                    setAccount(text || '')
                }}></TextInput>
        );
    }


    const renderPassword = () => {
        const styles = StyleSheet.create({
            input: {
                width: '100%',
                height: 40,
                backgroundColor: '#f0f0f0',
                marginTop: 8,
                borderRadius: 8,
                paddingHorizontal: 12,
                fontSize: 16,
                color: '#333333'
            }
        })

        return (
            <TextInput style={styles.input} maxLength={20}
                value={password}
                onChangeText={(text) => {
                    setPassword(text || '')
                }}></TextInput>
        );
    }


    const renderButton = () => {
        const styles = StyleSheet.create({
            saveButton: {
                width: '100%',
                height: 44,
                backgroundColor: '#3050ff',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 8,
                marginBottom: 6
            },
            saveTxt: {
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold'
            }
        })

        return (
            <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
                <Text style={styles.saveTxt}>保 存</Text>
            </TouchableOpacity>
        );
    }



    return (
        <Modal visible={visible} onRequestClose={hide}
            transparent={true}
            statusBarTranslucent={true}
            animationType='fade'
        >

            <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.content}>
                    {renderTitle()}
                    <Text style={styles.subTitleTxt}>账号类型</Text>
                    {renderType()}
                    <Text style={styles.subTitleTxt}>账号名称</Text>
                    {renderName()}
                    <Text style={styles.subTitleTxt}>账号</Text>
                    {renderAccount()}

                    <Text style={styles.subTitleTxt}>密码</Text>
                    {renderPassword()}

                    {renderButton()}
                </View>


            </KeyboardAvoidingView>
        </Modal>

    )
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000060',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12
    },
    subTitleTxt: {
        fontSize: 12,
        color: '#666666',
        marginTop: 16
    }


})