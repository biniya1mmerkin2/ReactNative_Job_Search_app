import { View, Text ,TouchableOpacity,ActivityIndicator} from 'react-native'
import { useRouter } from 'expo-router'
import {COLORS} from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';


import styles from './popularjobs.style'

const Popularjobs = () => {
  const router=useRouter();
  const {data, isLoading, error}=useFetch('search',{
    query:'Python developer in Texas, USA',
    page:"1",
    num_pages: "1"
  });


  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
        data?.map((job)=>(
          <NearbyJobCard 
           job={job}
           key={`nearby-job-${job?.job_id}`}
           handleNavigate={()=>{ router.push(`/job-details/${job?.job_id}`)}}
          />
        ))
       )}
      </View>
    </View>
  )
}

export default Popularjobs;