/**
 * Feature:                 Service:
 * Login/signup             User
 * 
 * Post a tweet             Tweet(Pull/Push)
 * News Fees
 * Timeline
 * Like
 * 
 * Upload Image             Media
 * Upload Video
 * 
 * Follow                   Friendship
 * Unfollow
 * 
 * Send/Receive Message     Message/Thread/Socket
 * Group Chat               MQ, Async
 * Notification
 * 
 * Online Status            Status
 * 
 * Multi Region             CDN
 * 
 * Nearby (LBS)             Geograph(Geohash)
 * Report location          Sharding by city
 *
 * Request/Take Ride        Dispatch
 */
/**
 * Geohash:
 * 1. Map (long, lati) => 2^64 int
 * 2. Base32 (2^5): 0-9 + 26 - 4(a,i,l,o) = 32
 * 3. longer prefix => nearer
 * 4. hash long: 
 *    4.1 (-180, 180), left: 0, right: 1
 *    4.2 binary search
 * 5. hash lati:
 *    5.1 (-90, 90), down: 0, up: 1
 *    5.2 binary search
 * 6. Interleaving: long first, lati letter, ex: 11100 11101
 * 7. Macth precision: 
 *    geohash length: 5, 
 *    lati bits: 12,
 *    long bits: 13,
 *    km error: 2.4 km
 * 8. SQL: geohash as index
 *    NoSQL - Cassandra: geohash as column key, rangeQuery(9q9hv0, 9q9hvz)
 *    NoSQL - Redis/Memcache: key: 9q9hvt, value set of near hotel
 * 9. Select Redis:
 *    Location Table:
 *      key: geohash, 
 *      value: set(near locations)
 *    Uber: Driver Table:
 *      key: id,
 *      value: [lat, lng, status, updated_at, trip_id]
 * 
 * Sharding by City: (Geo Fence)
 * 1. Polygon as city boundary
 * 2. Question: whether (lng, lat) in the area -> geometry question
 * 
 * sharding key: city id
 */