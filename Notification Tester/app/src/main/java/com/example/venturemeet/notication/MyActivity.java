package com.example.venturemeet.notication;

import android.app.Activity;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.NotificationManagerCompat;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.support.v4.app.NotificationCompat;

public class MyActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);

        final Button button = (Button) findViewById(R.id.buttonnotificationyes);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                int notificationId = 001;
                // Build intent for notification content
                Intent viewIntent = new Intent(getApplicationContext(), MyActivity.class);
                //viewIntent.putExtra(EXTRA_EVENT_ID, eventId);
                PendingIntent viewPendingIntent =
                        PendingIntent.getActivity(getApplicationContext(), 0, viewIntent, 0);

                long[] vib = {0,500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500};

                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(getApplicationContext())
                                .setSmallIcon(R.drawable.comma)
                                .setContentTitle("Venture Meet")
                                .setContentText("We found you a Partner! Meet with John Smith")
                                .setContentIntent(viewPendingIntent)
                                .setVibrate(vib);

                // Get an instance of the NotificationManager service
                NotificationManagerCompat notificationManager =
                        NotificationManagerCompat.from(getApplicationContext());

                // Build the notification and issues it with notification manager.
                notificationManager.notify(notificationId, notificationBuilder.build());
            }
        });


        final Button button2 = (Button) findViewById(R.id.buttonnotificationno);
        button2.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                int notificationId = 001;
                // Build intent for notification content
                Intent viewIntent = new Intent(getApplicationContext(), MyActivity.class);
                //viewIntent.putExtra(EXTRA_EVENT_ID, eventId);
                PendingIntent viewPendingIntent =
                        PendingIntent.getActivity(getApplicationContext(), 0, viewIntent, 0);

                NotificationCompat.Builder notificationBuilder =
                        new NotificationCompat.Builder(getApplicationContext())
                                .setSmallIcon(R.drawable.comma)
                                .setContentTitle("Venture Meet")
                                .setContentText("No available partner found yet.")
                                .setContentIntent(viewPendingIntent);

                // Get an instance of the NotificationManager service
                NotificationManagerCompat notificationManager =
                        NotificationManagerCompat.from(getApplicationContext());

                // Build the notification and issues it with notification manager.
                notificationManager.notify(notificationId, notificationBuilder.build());
            }
        });

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.my, menu);
        return true;
    }



    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
