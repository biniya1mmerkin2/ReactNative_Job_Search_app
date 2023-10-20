import {useState} from 'react'
import { View, Text ,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import {COLORS, SIZES} from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';


import styles from './nearbyjobs.style'

const Nearbyjobs = () => {
  const router=useRouter();
  const {data, isLoading, error}=useFetch('search',{
    query:'Python developer in Texas, USA',
    page:"1",
    num_pages: "1"
  });


  const [selectedJob, setSelectedJob]=useState();
  const handleCardPress=(item)=>{
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)

  }

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popublar Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
       {isLoading?(
        <ActivityIndicator  size='large' color={COLORS.primary} />
       ): error?(
        <Text>Something Went wrong</Text>
       ):(
        <FlatList 
         data={data}
         renderItem={({item})=>(
            <PopularJobCard 
               item={item}
               selectedJob={selectedJob}
               handleCardPress={handleCardPress}
            />
         )}
         keyExtractor={item => item?.job_id}
         contentContainerStyle={{columnGap:SIZES.medium}}
         horizontal
        />
       )}
      </View>
    </View>
  )
}

export default Nearbyjobs