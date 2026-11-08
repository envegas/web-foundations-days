# SnapShare: Photo-Sharing App Scaling Plan

## 1. Assumptions

SnapShare has 10 million registered users, with 10% active daily.

The following assumptions are used:

- Registered users: 10,000,000.
- Daily active users: 10%.
- Each active user uploads 1 photo daily.
- Each active user views 50 feed pages daily.
- Average original photo size: 2 MB.
- Average thumbnail size: 50 KB (0.05 MB).
- One day contains 86,400 seconds.
- One year contains 365 days.
- Peak traffic is estimated at 5 times average traffic.
- No photo deletions or storage compression are assumed.
- All daily active users are assumed to perform their daily uploads and feed views.## 2. Traffic and Storage Calculations

### Daily Active Users

10,000,000 x 10% = 1,000,000 daily active users.

### Photo Uploads

1,000,000 users x 1 photo = 1,000,000 uploads per day.

Average uploads per second:

1,000,000 / 86,400 = 11.57 uploads per second.

### Feed Views

1,000,000 users x 50 views = 50,000,000 feed views per day.

Average feed views per second:

50,000,000 / 86,400 = 578.70 feed views per second.

Peak feed views per second:

578.70 x 5 = 2,893.52, approximately 2,894 feed views per second.### Annual Photo Storage

Original photo size: 2 MB.
Thumbnail size: 0.05 MB.
Combined size per upload: 2.05 MB.

Daily storage:

1,000,000 x 2.05 MB = 2,050,000 MB.

Annual storage:

2,050,000 x 365 = 748,250,000 MB.

Total estimated annual storage: 748.25 TB, using decimal storage units.

Breakdown:
- Original photos: 730 TB per year.
- Thumbnails: 18.25 TB per year.
- Total: 748.25 TB per year.

These estimates exclude backups, replicas, temporary files and other storage overhead.## 3. Read-Heavy or Write-Heavy?

SnapShare is a read-heavy system because users view 50 feed pages for every photo they upload.

This produces approximately 50 million daily feed views compared with 1 million daily photo uploads.

The architecture should therefore prioritise fast reads and efficient photo delivery. Caching, a CDN and database read replicas will help distribute read traffic and reduce pressure on the primary database.

## 4. Photo Storage Strategy

Photo files should not be stored directly inside the relational database because large image files increase database storage requirements, backup sizes and operational overhead.

Instead, original photos and thumbnails will be stored in object storage such as Amazon S3, Azure Blob Storage or Google Cloud Storage.

The database will store photo metadata, including the photo ID, user ID, caption, upload date and object storage locations.

A CDN will deliver cached photo files to users from locations closer to them.## 5. System Architecture Diagram

```text
                    USERS
                (Mobile / Web)
                      |
                LOAD BALANCER
                      |
                 APP SERVERS
                /     |      \
               /      |       \
          CACHE    DATABASE   OBJECT STORAGE
                     |        (Original Photos)
                READ REPLICA       |
                                  CDN
                                   |
                                  USERS

         PHOTO UPLOAD AND BACKGROUND PROCESSING

         USER
          |
      APP SERVER
          |
      SIGNED UPLOAD URL
          |
      OBJECT STORAGE
          |
      DATABASE (Photo Metadata)
          |
        QUEUE
          |
    THUMBNAIL WORKER
          |
      OBJECT STORAGE
      (Thumbnail)
          |
         CDN
          |
         USERS
```## 6. Component Explanations

- CDN: Delivers cached photos from locations closer to users, reducing latency and load on object storage.
- Load Balancer: Distributes incoming requests across multiple app servers to prevent one server from becoming overloaded.
- App Servers: Handle authentication, user requests, feed generation and photo metadata operations.
- Cache: Stores frequently requested feed data to reduce repeated database queries.
- Database: Stores structured information such as users, captions, photo metadata and follower relationships.
- Read Replica: Handles read queries separately from the primary database, reducing read pressure.
- Object Storage: Stores original photo files and thumbnails without filling the database with image data.
- Queue: Holds background processing jobs so photo uploads do not have to wait for thumbnail creation.
- Thumbnail Worker: Processes queued images, creates smaller thumbnail versions and saves them to object storage.

## 7. Photo Upload Flow

1. A user selects a photo and submits it through the mobile or web application.
2. The app server checks authentication, file type, file size and upload permissions.
3. The app server generates a secure, time-limited upload URL for object storage.
4. The client uploads the original photo directly to object storage using the secure URL.
5. The app server records the photo ID, user ID, caption and storage location in the database.
6. A background thumbnail generation job is added to the queue.
7. A thumbnail worker retrieves the original photo, generates a smaller thumbnail and saves it to object storage.
8. The worker updates the photo metadata with the thumbnail location.
9. The CDN can then deliver the thumbnail and original photo to users when requested.
## 8. Architecture Trade-offs

### Trade-off 1: Database Read Replicas

Advantage: Read replicas distribute database read requests and reduce pressure on the primary database.

Disadvantage: Replication can introduce delays, meaning a recently uploaded photo might not immediately appear in a feed served by a replica.

### Trade-off 2: CDN Caching

Advantage: CDN caching improves photo delivery speed, reduces bandwidth costs and reduces requests to object storage.

Disadvantage: Cached images may become outdated or remain available briefly after an image is deleted.

### Trade-off 3: Asynchronous Thumbnail Processing

Advantage: Users do not have to wait for image resizing before the original upload completes.

Disadvantage: Thumbnails may not be immediately available, and failed background jobs require retries and monitoring.

## 9. Conclusion

SnapShare requires a scalable, read-heavy architecture capable of supporting one million daily active users, approximately 2,894 peak feed views per second and an estimated 748.25 TB of new photo storage annually.

Using load balancing, caching, database read replicas, object storage, a CDN and asynchronous thumbnail processing will help the application handle growing traffic while maintaining good performance and reliability.
