package fr.thomas.eq_04_00_sae_mobile.activities

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.SeekBar
import android.widget.Spinner
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import fr.thomas.eq_04_00_sae_mobile.R

class MainActivity : AppCompatActivity() {
    private lateinit var intent: Intent
    private lateinit var query: EditText
    private lateinit var cuisine: Spinner
    private lateinit var diet: Spinner
    private lateinit var max: SeekBar
    private lateinit var search: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.main_activity)

        /**
         * This code sets an OnApplyWindowInsetsListener to the view with id 'main'.
         * The listener updates the padding of the view based on the system insets,
         * which are the areas around the display that may be occupied by system UI elements like the status bar or navigation bar.
         * By using this method, we ensure that the view always has the correct padding,
         * even if the user changes the system display settings or uses a device with different screen dimensions.
         */
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        intent = Intent(this, ResultActivity::class.java)
        search = findViewById(R.id.main_search_button)
        query = findViewById(R.id.main_query_input)
        cuisine = findViewById(R.id.main_type_spinner)
        diet = findViewById(R.id.main_diet_spinner)
        max = findViewById(R.id.main_number_seekbar)

        /**
         * Set up adapter for Cuisines Spinner
         */
        ArrayAdapter.createFromResource(
            this,
            R.array.cuisines_french,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            cuisine.adapter = adapter
        }

        /**
         * Set up adapter for Diet Spinner
         */
        ArrayAdapter.createFromResource(
            this,
            R.array.diets_french,
            android.R.layout.simple_spinner_item
        ).also { adapter ->
            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
            diet.adapter = adapter
        }

        search.setOnClickListener { startActivity(intent) }
    }
}