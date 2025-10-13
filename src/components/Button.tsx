import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    label: string;
    handler: Function;
};

export default function Button({ label, handler }: Props) {
    return (
        <View style={styles.buttonContainer}>
        {/* <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}> */}
        <Pressable style={styles.button} onPress={() => handler()}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
  },
});
