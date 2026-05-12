import mysql.connector

# Configuration
config = {
    "user": "root",
    "password": "root",
    "host": "127.0.0.1",
    "database": "sdcms_db_testing",
}


def fix_naming_mismatch():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)

    # 1. Fetch procedures containing the wrong casing
    query = """
    SELECT ROUTINE_NAME, ROUTINE_TYPE, ROUTINE_DEFINITION
    FROM information_schema.ROUTINES
    WHERE ROUTINE_SCHEMA = 'sdcms_db_testing'
    AND ROUTINE_DEFINITION LIKE '%Party_master%'
    """
    cursor.execute(query)
    routines = cursor.fetchall()

    for row in routines:
        name = row["ROUTINE_NAME"]
        rtype = row["ROUTINE_TYPE"]
        original_def = row["ROUTINE_DEFINITION"]

        # 2. Perform the replacement
        # You can add more replacements here if needed
        new_def = original_def.replace("Party_master", "party_master")

        print(f"Updating {rtype}: {name}...")

        try:
            # 3. Drop and Recreate
            cursor.execute(f"DROP {rtype} IF EXISTS `{name}`")

            # Re-wrap in CREATE statement (Note: definitions in schema usually
            # exclude the CREATE PROCEDURE header depending on the engine)
            full_sql = f"CREATE {rtype} `{name}`() \n {new_def}"
            cursor.execute(full_sql)

            print(f"Successfully updated {name}")
        except Exception as e:
            print(f"Failed to update {name}: {e}")

    conn.commit()
    cursor.close()
    conn.close()


if __name__ == "__main__":
    fix_naming_mismatch()
